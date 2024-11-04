import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import connection from './connection.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const productos = Router();

productos.post('/agregarProducto', (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const imagen = req.body.imagen;
    const precio = req.body.precio;
    const categoria = req.body.categoria;

    connection.query('insert into producto(nombre, descripcion, imagen, precio, categoria) values (?, ?, ?, ?, ?)', [nombre, descripcion, imagen, precio, categoria], (err, respuesta, fields) => {
        if (err) {
            console.log("Error al conectar", err);
            return res.status(500).send("Error al conectar");
        }
       
        res.sendFile(join(__dirname, '..', '..', 'public', 'html', 'index.html'));
    });
});

productos.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM producto', (err, respuesta) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(respuesta);
    });
});

export default productos;
