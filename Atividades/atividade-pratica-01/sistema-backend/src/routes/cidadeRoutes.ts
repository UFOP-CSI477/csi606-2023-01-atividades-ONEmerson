import express from 'express';
import { createCidade, getCidades, updateCidade, deleteCidade } from '../controllers/CidadeController';

const router = express.Router();

router.post('/cidades', createCidade);
router.get('/cidades', getCidades);
router.put('/cidades/:id', updateCidade);
router.delete('/cidades/:id', deleteCidade);

export default router;
