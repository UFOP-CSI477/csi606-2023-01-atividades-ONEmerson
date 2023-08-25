import React, { useState } from 'react';
import api from '../api';

function CompraForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/itens', { nome, descricao });
      alert('Compra criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar Compra.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label>
        Descrição:
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </label>
      <button type="submit">Criar Compra</button>
    </form>
  );
}

export default CompraForm;
