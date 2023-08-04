import { Request, Response } from 'express';
import connection from '../db/connection';

export const createCompra = async (req: Request, res: Response) => {
  try {
    const { usuario_id, endereco_id, data } = req.body;
    const query = 'INSERT INTO compras (usuario_id, endereco_id, data) VALUES (?, ?, ?)';
    const [result] = await (await connection).execute(query, [usuario_id, endereco_id, data]);
    const compra = {
      id: (result as any).insertId,
      usuario_id,
      endereco_id,
      data,
    };
    res.status(201).json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar compra' });
  }
};

export const getCompras = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM compras';
    const [rows] = await (await connection).execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar compras' });
  }
};

export const updateCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { usuario_id, endereco_id, data } = req.body;
    const query = 'UPDATE compras SET usuario_id = ?, endereco_id = ?, data = ? WHERE id = ?';
    await (await connection).execute(query, [usuario_id, endereco_id, data, id]);
    res.status(200).json({ message: 'Compra atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar compra' });
  }
};

export const deleteCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM compras WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Compra deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar compra' });
  }
};
