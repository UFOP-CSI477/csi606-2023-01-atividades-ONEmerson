import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ExcluirEnderecoPage() {
  const navigate = useNavigate();
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
  };

  const handleExcluir = async () => {
    try {
      await api.delete(`/enderecos/${selectedEnderecoId}`);
      alert('Endereço excluído com sucesso!');
      navigate('/enderecos');
    } catch (error) {
      alert('Erro ao excluir endereço.');
    }
  };

  return (
    <div>
      <h2>Excluir Endereço</h2>
      <select value={selectedEnderecoId} onChange={handleEnderecoSelect}>
        <option value="">Selecione um endereço</option>
        {enderecos.map((endereco) => (
          <option key={endereco.id} value={endereco.id}>
            {endereco.rua}, {endereco.numero}, {endereco.bairro}
          </option>
        ))}
      </select>
      {selectedEnderecoId && (
        <div>
          <p>Você tem certeza que deseja excluir este endereço?</p>
          <button onClick={handleExcluir}>Excluir</button>
        </div>
      )}
    </div>
  );
}

export default ExcluirEnderecoPage;
