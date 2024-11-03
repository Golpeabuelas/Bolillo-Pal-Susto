
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