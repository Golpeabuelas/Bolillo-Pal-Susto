import { Router } from 'express';
import connection from './connection.js';

const userLoader = Router();

userLoader.post('/iniciarSesion', (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;

    if (!correo || !password) {
        return res.status(400).json({ error: "Correo y contraseña son requeridos" })
    }

    connection.query('SELECT * FROM usuario WHERE correo = ?', [correo], (err, resultados) => {
        if (err) {
            console.log("Error en la consulta:", err)
            return res.status(500).send("Error al verificar usuario")
        }

        if (resultados.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }

        const usuario = resultados[0]

        if (usuario.password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" })
        }
        
        res.json({ id_usuario: usuario.id_usuario })
    })
})

userLoader.post('/consultarPermisos', (req, res) => {
    const id_usuario = req.body.id_usuario

    connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario], (err, resultados) => {
        if (err) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        
        res.json({ permisos: resultados[0].permisos })
    })
})

export default userLoader