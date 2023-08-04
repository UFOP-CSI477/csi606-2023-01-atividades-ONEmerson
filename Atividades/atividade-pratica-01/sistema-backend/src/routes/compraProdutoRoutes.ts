import express from 'express';
import { createCompraProduto, getComprasProdutos, updateCompraProduto, deleteCompraProduto } from '../controllers/CompraProdutoController';

const router = express.Router();

router.post('/compras_produtos', createCompraProduto);
router.get('/compras_produtos', getComprasProdutos);
router.put('/compras_produtos/:id', updateCompraProduto);
router.delete('/compras_produtos/:id', deleteCompraProduto);

export default router;
