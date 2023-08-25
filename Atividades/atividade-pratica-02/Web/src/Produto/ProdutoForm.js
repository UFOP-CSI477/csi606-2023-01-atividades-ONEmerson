import React, { useState } from 'react';
import api from '../api';

function ProdutoForm() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', { descricao, valor_unitario: valor });
      alert('Produto criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar produto.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Descrição:
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </label>
      <label>
        Valor Unitário:
        <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
      </label>
      <button type="submit">Criar Produto</button>
    </form>
  );
}

export default ProdutoForm;
