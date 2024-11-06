import express, { response } from 'express'
import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import connection from './connection.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sesiones = Router();

sesiones.use(express.json());

sesiones.post('/agregarUsuario', (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const password = req.body.password;
    const fecha_nac = req.body.fecha_nac;

    connection.query('INSERT INTO usuario(nombre, correo, telefono, password, fecha_nac, permisos) VALUES (?, ?, ?, ?, ?, ?)', [nombre, correo, telefono, password, fecha_nac, false], (err, respuesta, fields) => {
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
        
        res.json({ id_usuario: usuario.id_usuario });
    });
});

sesiones.post('/actualizarSesionIniciada', (req, res) => {
    const id_antigua = req.body.id_usuario_viejo;
    const id_nueva = req.body.id_usuario_nuevo;

    connection.query('UPDATE sesioniniciada SET id_sesion = ? WHERE id_sesion = ?', [id_nueva, id_antigua], (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }

        res.status(200).json({ mensaje: 'Sesión actualizada correctamente' });
    }); 
});

sesiones.post('/consultarPermisos', (req, res) => {
    const id_usuario = req.body.id_usuario;

    connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario], (err, resultados) => {
        if (err) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json({ permisos: resultados[0].permisos })
    })
})

sesiones.get('/cargarSesion', (req, res) => {
    connection.query('SELECT * FROM sesioniniciada', (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuario' });
        }
            
        res.json({ id_sesion: resultado[0].id_sesion});
    });
});


export default sesiones;


