// src/models/Endereco.ts

export interface Endereco {
    id: number;
    usuario_id: number;
    rua: string;
    numero: string;
    bairro: string;
    cidade_id: number;
    telefone: string;
    created_at: Date;
    updated_at: Date;
  }
  