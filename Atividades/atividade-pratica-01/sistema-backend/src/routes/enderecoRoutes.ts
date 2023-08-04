import express from 'express';
import { createEndereco, getEnderecos, updateEndereco, deleteEndereco } from '../controllers/EnderecoController';

const router = express.Router();

router.post('/enderecos', createEndereco);
router.get('/enderecos', getEnderecos);
router.put('/enderecos/:id', updateEndereco);
router.delete('/enderecos/:id', deleteEndereco);

export default router;
