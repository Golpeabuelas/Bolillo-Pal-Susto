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

productos.post('/borrarProducto', (req, res) => {
    const id = req.body.id;
    
    connection.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, resultado, fields) => {

        if (err) {
            console.error('Error al borrar el usuario:', err);
            return res.status(500).send("Error al borrar el usuario");
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado");
        }
        return res.send(`Usuario con ID ${id} borrado correctamente`);
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
