import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ExcluirProdutoPage() {
  const [produtos, setProdutos] = useState([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    fetchProdutos();
  }, []);

  const handleExcluir = async () => {
    try {
      await api.delete(`/produtos/${selectedProdutoId}`);
      alert('Produto excluído com sucesso!');
      navigate('/produtos');
    } catch (error) {
      alert('Erro ao excluir produto.');
    }
  };

  return (
    <div>
      <h2>Excluir Produto</h2>
      <label>
        Selecione o produto:
        <select value={selectedProdutoId} onChange={(e) => setSelectedProdutoId(e.target.value)}>
          <option value="">Selecione um produto</option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.descricao}
            </option>
          ))}
        </select>
      </label>
      {selectedProdutoId && (
        <div>
          <p>Você tem certeza que deseja excluir este produto?</p>
          <button onClick={handleExcluir}>Excluir</button>
        </div>
      )}
    </div>
  );
}

export default ExcluirProdutoPage;
