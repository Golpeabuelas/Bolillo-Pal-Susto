import express from 'express';
import { Router } from 'express';
import connection from './connection.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sesiones = Router();

sesiones.post('/agregarUsuario', (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const password = req.body.password;
    const fecha_nac = req.body.fecha_nac;

    connection.query('insert into usuario(nombre, correo, telefono, password, fecha_nac, permisos) values (?, ?, ?, ?, ?, ?)', [nombre, correo, telefono, password, fecha_nac, false], (err, respuesta, fields) => {
        if (err) {
            console.log("Error al conectar", err);
            return res.status(500).send("Error al conectar");
        }
       
        res.sendFile(join(__dirname, '..', '..', 'public', 'html', 'index.html'));
    });
});

sesiones.post('/iniciarSesion', (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;

    if (!correo || !password) {
        return res.status(400).json({ error: "Correo y contraseña son requeridos" });
    }

    connection.query('SELECT * FROM usuario WHERE correo = ?', [correo], (err, resultados) => {
        if (err) {
            console.log("Error en la consulta:", err);
            return res.status(500).send("Error al verificar usuario");
        }

        if (resultados.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuario = resultados[0];

        if (usuario.password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
            }
        });
    });
});

export default sesiones;
