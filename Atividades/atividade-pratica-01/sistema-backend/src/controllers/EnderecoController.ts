import { Request, Response } from 'express';
import connection from '../db/connection';

export const createEndereco = async (req: Request, res: Response) => {
  try {
    const { usuario_id, rua, numero, bairro, cidade_id, telefone } = req.body;
    const query =
      'INSERT INTO enderecos (usuario_id, rua, numero, bairro, cidade_id, telefone) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await (await connection).execute(query, [usuario_id, rua, numero, bairro, cidade_id, telefone]);
    const endereco = {
      id: (result as any).insertId,
      usuario_id,
      rua,
      numero,
      bairro,
      cidade_id,
      telefone,
    };
    res.status(201).json(endereco);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar endereço' });
  }
};

export const getEnderecos = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM enderecos';
    const [rows] = await (await connection).execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar endereços' });
  }
};

export const updateEndereco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { usuario_id, rua, numero, bairro, cidade_id, telefone } = req.body;
    const query =
      'UPDATE enderecos SET usuario_id = ?, rua = ?, numero = ?, bairro = ?, cidade_id = ?, telefone = ? WHERE id = ?';
    await (await connection).execute(query, [usuario_id, rua, numero, bairro, cidade_id, telefone, id]);
    res.status(200).json({ message: 'Endereço atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar endereço' });
  }
};

export const deleteEndereco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM enderecos WHERE id = ?';
    await (await connection).execute(query, [id]);
    res.status(200).json({ message: 'Endereço deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar endereço' });
  }
};
