import { Request, Response } from 'express';
import connection from '../db/connection';

export const createCidade = async (req: Request, res: Response) => {
  try {
    const { nome, estado_id } = req.body;
    const query = 'INSERT INTO cidades (nome, estado_id) VALUES (?, ?)';
    const [result] = await (await connection).execute(query, [nome, estado_id]);
    const cidade = {
      id: (result as any).insertId,
      nome,
      estado_id,
    };
    res.status(201).json(cidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cidade' });
  }
};

export const getCidades = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM cidades';
    const [rows] = await (await connection).execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cidades' });
  }
};

export const updateCidade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, estado_id } = req.body;
    const query = 'UPDATE cidades SET nome = ?, estado_id = ? WHERE id = ?';
    await (await connection).execute(query, [nome, estado_id, id]);
    res.status(200).json({ message: 'Cidade atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cidade' });
  }
};

export const deleteCidade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM cidades WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Cidade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cidade' });
  }
};
