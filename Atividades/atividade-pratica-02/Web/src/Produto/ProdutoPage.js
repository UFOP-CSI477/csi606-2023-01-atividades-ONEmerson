import React, { useEffect, useState } from 'react';
import api from '../api';
import ProdutoForm from './ProdutoForm';
import { Link } from 'react-router-dom'; 

function ProdutoPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    }
    fetchProdutos();
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ProdutoForm />
      <ul>
      {produtos.map((produto) => (
  <li key={produto.id}>
    {produto.descricao} - R${produto.valor_unitario}
    <Link to={`/produtos/editar/${produto.id}`}>Editar</Link>
    <Link to={`/produtos/excluir/${produto.id}`}>Excluir</Link>
  </li>
))}
      </ul>
    </div>
  );
}

export default ProdutoPage;
