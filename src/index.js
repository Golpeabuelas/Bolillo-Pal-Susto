import express from 'express';  
import morgan from 'morgan';
import mysql from "mysql2";  

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './server-functions/navegacion.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bajoterra_2',
    database: 'bolillo'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(router);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'html', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
