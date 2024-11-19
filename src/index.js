import express from 'express';  
import morgan from 'morgan';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import router from './server_functions/router.js';
import sesiones from './server_functions/sql_functions/crud_sesiones.js';
import productos from './server_functions/sql_functions/crud_productos.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); 

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());

app.use(router);
app.use(sesiones);
app.use(productos)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'html', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
