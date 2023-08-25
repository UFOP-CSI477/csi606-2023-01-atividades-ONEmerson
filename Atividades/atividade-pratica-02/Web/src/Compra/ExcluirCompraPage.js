import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ExcluirCompraPage() {
  const [compras, setCompras] = useState([]);
  const [selectedCompraId, setSelectedCompraId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompras() {
      try {
        const response = await api.get('/compras');
        setCompras(response.data);
      } catch (error) {
        console.error('Erro ao buscar compras:', error);
      }
    }
    fetchCompras();
  }, []);

  const handleExcluir = async () => {
    try {
      await api.delete(`/compras/${selectedCompraId}`);
      alert('Compra excluída com sucesso!');
      navigate('/compras');
    } catch (error) {
      alert('Erro ao excluir compra.');
    }
  };

  return (
    <div>
      <h2>Excluir Compra</h2>
      <label>
        Selecione a compra:
        <select value={selectedCompraId} onChange={(e) => setSelectedCompraId(e.target.value)}>
          <option value="">Selecione uma compra</option>
          {compras.map((compra) => (
            <option key={compra.id} value={compra.id}>
              {compra.id} - {compra.data}
            </option>
          ))}
        </select>
      </label>
      {selectedCompraId && (
        <div>
          <p>Você tem certeza que deseja excluir esta compra?</p>
          <button onClick={handleExcluir}>Excluir</button>
        </div>
      )}
    </div>
  );
}

export default ExcluirCompraPage;
