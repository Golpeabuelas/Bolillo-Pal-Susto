import express from 'express';  
import morgan from 'morgan';
import mysql from "mysql2";  

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import router from './server-functions/navegacion.js';
import sesiones from './server-functions/conexiones-sql/mysql-sesiones.js';
import productos from './server-functions/conexiones-sql/mysql-productos.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); 

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(router);
app.use(sesiones);
app.use(productos)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'html', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
