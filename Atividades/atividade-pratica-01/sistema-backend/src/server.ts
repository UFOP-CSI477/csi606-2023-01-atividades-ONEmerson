// src/server.ts

import express from 'express';
import estadoRoutes from './routes/estadoRoutes';
import cidadeRoutes from './routes/cidadeRoutes';
import produtoRoutes from './routes/produtoRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import enderecoRoutes from './routes/enderecoRoutes';
import compraRoutes from './routes/compraRoutes';
import compraProdutoRoutes from './routes/compraProdutoRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use(estadoRoutes);
app.use(cidadeRoutes);
app.use(produtoRoutes);
app.use(usuarioRoutes);
app.use(enderecoRoutes);
app.use(compraRoutes);
app.use(compraProdutoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
