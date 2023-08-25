import React, { useState } from 'react';
import api from '../api';

function EnderecoForm() {
  const [usuarioId, setUsuarioId] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/enderecos', {
        usuario_id: usuarioId,
        rua,
        numero,
        bairro,
        cidade_id: cidadeId,
        telefone,
      });
      alert('Endereço criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar endereço.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Usuário ID:
        <input type="number" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />
      </label>
      <label>
        Rua:
        <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} />
      </label>
      <label>
        Número:
        <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
      </label>
      <label>
        Bairro:
        <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
      </label>
      <label>
        Cidade ID:
        <input type="number" value={cidadeId} onChange={(e) => setCidadeId(e.target.value)} />
      </label>
      <label>
        Telefone:
        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </label>
      <button type="submit">Criar Endereço</button>
    </form>
  );
}

export default EnderecoForm;
