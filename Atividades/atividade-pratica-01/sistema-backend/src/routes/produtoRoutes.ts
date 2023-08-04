import express from 'express';
import { createProduto, getProdutos, updateProduto, deleteProduto } from '../controllers/ProdutoController';

const router = express.Router();

router.post('/produtos', createProduto);
router.get('/produtos', getProdutos);
router.put('/produtos/:id', updateProduto);
router.delete('/produtos/:id', deleteProduto);

export default router;
