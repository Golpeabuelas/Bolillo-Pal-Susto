import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get('/index', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/index.html'));
});

router.get('/sign_in', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/sign_in.html'));
});

router.get('/sign_up', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/sign_up.html'));
});

router.get('/cotizacion', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/cotizador.html'));
});

router.get('/gestionar_inventario', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/gestionar_inventario.html'));
});

export default router;
