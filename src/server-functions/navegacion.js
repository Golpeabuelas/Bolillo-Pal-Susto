import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get('/index', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'html', 'index.html'));
});

router.get('/sign-in', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'html', 'sign-in.html'));
});

router.get('/sign-up', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'html', 'sign-up.html'));
});

router.get('/sign-password', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'html', 'sign-password.html'));
});

router.get('/cotizacion', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'html', 'cotizador.html'));
});

export default router;
