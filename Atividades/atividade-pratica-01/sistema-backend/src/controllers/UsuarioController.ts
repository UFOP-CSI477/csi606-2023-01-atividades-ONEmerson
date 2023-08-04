import { Request, Response } from 'express';
import connection from '../db/connection';

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    const [result] = await (await connection).execute(query, [nome, email, senha]);
    const usuario = {
      id: (result as any).insertId,
      nome,
      email,
      senha,
    };
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const getUsuarios = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM usuarios';
    const [rows] = await (await connection).execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
    await (await connection).execute(query, [nome, email, senha, id]);
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
