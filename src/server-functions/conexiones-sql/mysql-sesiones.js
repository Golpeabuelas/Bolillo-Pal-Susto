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

export default sesiones;
