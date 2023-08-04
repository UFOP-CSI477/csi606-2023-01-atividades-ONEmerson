// src/routes/estadoRoutes.ts

import express from 'express';
import { deleteEstado, getEstados, updateEstado } from '../controllers/EstadoController';
import { createEstado } from '../controllers/EstadoController';

const router = express.Router();

router.post('/estados', createEstado);
router.get('/estados', getEstados);
router.put('/estados/:id', updateEstado);
router.delete('/estados/:id', deleteEstado);

export default router;
