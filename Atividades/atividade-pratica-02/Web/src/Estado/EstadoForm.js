import React, { useState } from 'react';
import api from '../api';

function EstadoForm() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/estados', { nome, sigla });
      alert('Estado criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar estado.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label>
        Sigla:
        <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} />
      </label>
      <button type="submit">Criar Estado</button>
    </form>
  );
}

export default EstadoForm;
