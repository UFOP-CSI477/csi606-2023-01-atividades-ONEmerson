import { Request, Response } from 'express';
import connection from '../db/connection';

export const createCompraProduto = async (req: Request, res: Response) => {
  try {
    const { compra_id, produto_id, quantidade, valor_unitario } = req.body;
    const query =
      'INSERT INTO compras_produtos (compra_id, produto_id, quantidade, valor_unitario) VALUES (?, ?, ?, ?)';
    const [result] = await (await connection).execute(query, [compra_id, produto_id, quantidade, valor_unitario]);
    const compraProduto = {
      id: (result as any).insertId,
      compra_id,
      produto_id,
      quantidade,
      valor_unitario,
    };
    res.status(201).json(compraProduto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar compra de produto' });
  }
};

export const getComprasProdutos = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM compras_produtos';
    const [rows] = await (await connection).execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar compras de produtos' });
  }
};

export const updateCompraProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { compra_id, produto_id, quantidade, valor_unitario } = req.body;
    const query =
      'UPDATE compras_produtos SET compra_id = ?, produto_id = ?, quantidade = ?, valor_unitario = ? WHERE id = ?';
    await (await connection).execute(query, [compra_id, produto_id, quantidade, valor_unitario, id]);
    res.status(200).json({ message: 'Compra de produto atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar compra de produto' });
  }
};

export const deleteCompraProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM compras_produtos WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Compra de produto deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar compra de produto' });
  }
};
