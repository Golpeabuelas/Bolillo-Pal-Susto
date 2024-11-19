import { Router } from 'express';
import connection from './connection.js';

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
       
    });
});

productos.post('/borrarProducto', (req, res) => {
    const id = req.body.id_borrar;
    
    connection.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, resultado, fields) => {

        if (err) {
            console.error('Error al borrar el producto:', err);
            return res.status(500).send("Error al borrar el producto");
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).send("Producto no encontrado");
        }
        
    });
});

productos.post('/editarProducto', (req, res) => {
    const id = req.body.id_editar;
    const nombre = req.body.nombre_editar;
    const descripcion = req.body.descripcion_editar;
    const imagen = req.body.imagen_editar;
    const precio = req.body.precio_editar;
    const categoria = req.body.categoria_editar;

    connection.query('UPDATE producto SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, categoria = ? WHERE id_producto = ?', [nombre, descripcion, imagen, precio, categoria, id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }

       res.sendFile(join(__dirname, '..', '..', 'public', 'html', 'index.html'));
    });
})

productos.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM producto', (err, respuesta) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(respuesta);
    });
});

export default productos;
