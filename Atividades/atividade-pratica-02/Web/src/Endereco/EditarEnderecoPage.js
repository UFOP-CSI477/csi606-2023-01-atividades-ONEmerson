import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function EditarEnderecoPage() {
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState({
    usuario_id: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade_id: '',
    telefone: '',
  });
  const [enderecos, setEnderecos] = useState([]);
  const [selectedEnderecoId, setSelectedEnderecoId] = useState('');

  useEffect(() => {
    async function fetchEnderecos() {
      try {
        const response = await api.get('/enderecos');
        setEnderecos(response.data);
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      }
    }
    fetchEnderecos();
  }, []);

  const handleEnderecoSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedEnderecoId(selectedId);
    const selectedEndereco = enderecos.find((endereco) => endereco.id === parseInt(selectedId));
    if (selectedEndereco) {
      setEndereco(selectedEndereco);
    } else {
      setEndereco({
        usuario_id: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade_id: '',
        telefone: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/enderecos/${selectedEnderecoId}`, endereco);
      alert('Endereço atualizado com sucesso!');
      navigate('/enderecos');
    } catch (error) {
      alert('Erro ao atualizar endereço.');
    }
  };

  return (
    <div>
      <h2>Editar Endereço</h2>
      <select value={selectedEnderecoId} onChange={handleEnderecoSelect}>
        <option value="">Selecione um endereço</option>
        {enderecos.map((endereco) => (
          <option key={endereco.id} value={endereco.id}>
            {endereco.rua}, {endereco.numero}, {endereco.bairro}
          </option>
        ))}
      </select>
      {selectedEnderecoId && (
        <form onSubmit={handleSubmit}>
          <label>
            Rua:
            <input type="text" value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} />
          </label>
          <label>
            Número:
            <input
              type="text"
              value={endereco.numero}
              onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
            />
          </label>
          <label>
            Bairro:
            <input
              type="text"
              value={endereco.bairro}
              onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
            />
          </label>
          <label>
            Cidade ID:
            <input
              type="text"
              value={endereco.cidade_id}
              onChange={(e) => setEndereco({ ...endereco, cidade_id: e.target.value })}
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              value={endereco.telefone}
              onChange={(e) => setEndereco({ ...endereco, telefone: e.target.value })}
            />
          </label>
          <button type="submit">Atualizar Endereço</button>
        </form>
      )}
    </div>
  );
}

export default EditarEnderecoPage;
