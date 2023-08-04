import express from 'express';
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../controllers/UsuarioController';

const router = express.Router();

router.post('/usuarios', createUsuario);
router.get('/usuarios', getUsuarios);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

export default router;
