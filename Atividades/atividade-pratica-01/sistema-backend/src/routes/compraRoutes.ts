import express from 'express';
import { createCompra, getCompras, updateCompra, deleteCompra } from '../controllers/CompraController';

const router = express.Router();

router.post('/compras', createCompra);
router.get('/compras', getCompras);
router.put('/compras/:id', updateCompra);
router.delete('/compras/:id', deleteCompra);

export default router;
