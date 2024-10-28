import express from 'express';  
import morgan from 'morgan';
import mysql from "mysql2";  

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

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

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'html', 'index.html'));
});

app.set('views', join(__dirname, 'views'));  
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', 'hbs');  

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({"message": "hola"}); 
});

app.use(express.static(join(__dirname, 'public')))

app.post('/agregarProducto', (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const imagen = req.body.imagen;
    const precio = req.body.precio;
    const categoria = req.body.categoria;

    connection.query('INSERT INTO producto (nombre, descripcion, imagen, precio, categoria) VALUES (?, ?, ?, ?, ?)', 
        [nombre, descripcion, imagen, precio, categoria], 
        (err, respuesta) => {
            if (err) {
                console.log("Error al insertar el producto:", err);
                return res.status(500).send("Error al insertar el producto");
            }
            return res.send("Producto agregado correctamente");
        }
    );
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
