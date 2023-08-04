// src/models/CompraProduto.ts

export interface CompraProduto {
    id: number;
    compra_id: number;
    produto_id: number;
    quantidade: number;
    valor_unitario: number;
    created_at: Date;
    updated_at: Date;
  }
  