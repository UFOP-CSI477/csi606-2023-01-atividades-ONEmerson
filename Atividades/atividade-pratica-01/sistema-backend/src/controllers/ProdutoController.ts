import { Request, Response } from 'express';
import connection from '../db/connection';

export const createProduto = async (req: Request, res: Response) => {
  try {
    const { descricao, valor_unitario } = req.body;
    const query = 'INSERT INTO produtos (descricao, valor_unitario) VALUES (?, ?)';
    const [result] = await (await connection).execute(query, [descricao, valor_unitario]);
    const produto = {
      id: (result as any).insertId,
      descricao,
      valor_unitario,
    };
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const getProdutos = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM produtos';
    const [rows] = await (await connection).execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descricao, valor_unitario } = req.body;
    const query = 'UPDATE produtos SET descricao = ?, valor_unitario = ? WHERE id = ?';
    await (await connection).execute(query, [descricao, valor_unitario, id]);
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
