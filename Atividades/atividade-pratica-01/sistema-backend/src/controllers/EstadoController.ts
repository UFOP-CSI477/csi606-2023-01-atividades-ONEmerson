// src/controllers/EstadoController.ts

import { Request, Response } from 'express';
import connection from '../db/connection';
import { ResultSetHeader } from 'mysql2/promise';

export const createEstado = async (req: Request, res: Response) => {
  try {
    const { nome, sigla } = req.body;
    const query = 'INSERT INTO estados (nome, sigla) VALUES (?, ?)';
    const [result] = await (await connection).execute(query, [nome, sigla]);
    const estado = {
      id: (result as ResultSetHeader).insertId,
      nome,
      sigla,
    };
    res.status(201).json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estado' });
  }
};

export const getEstados = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM estados';
    const [rows] = await (await connection).query(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estados' });
  }
};

export const updateEstado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, sigla } = req.body;
    const query = 'UPDATE estados SET nome = ?, sigla = ? WHERE id = ?';
    await (await connection).execute(query, [nome, sigla, id]);
    res.status(200).json({ message: 'Estado atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estado' });
  }
};

export const deleteEstado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM estados WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Estado deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar estado' });
  }
};
