import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function EditarProdutoPage() {
  const [produtos, setProdutos] = useState([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState('');
  const [produto, setProduto] = useState({
    descricao: '',
    valor_unitario: '',
  });
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

  useEffect(() => {
    async function fetchProduto() {
      if (selectedProdutoId) {
        try {
          const response = await api.get(`/produtos/${selectedProdutoId}`);
          setProduto(response.data);
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
        }
      }
    }
    fetchProduto();
  }, [selectedProdutoId]);

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/produtos/${selectedProdutoId}`, produto);
      alert('Produto atualizado com sucesso!');
      navigate('/produtos');
    } catch (error) {
      alert('Erro ao atualizar produto.');
    }
  };

  return (
    <div>
      <h2>Editar Produto</h2>
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
        <form onSubmit={handleEditar}>
          <label>
            Descrição:
            <input
              type="text"
              value={produto.descricao}
              onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
            />
          </label>
          <label>
            Valor Unitário:
            <input
              type="number"
              value={produto.valor_unitario}
              onChange={(e) => setProduto({ ...produto, valor_unitario: e.target.value })}
            />
          </label>
          <button type="submit">Atualizar Produto</button>
        </form>
      )}
    </div>
  );
}

export default EditarProdutoPage;
