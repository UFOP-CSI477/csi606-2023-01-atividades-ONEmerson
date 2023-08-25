import React, { useEffect, useState } from 'react';
import api from '../api';

function CompraPage() {
  const [compras, setCompras] = useState([]);

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

  return (
    <div>
      <h2>Compras</h2>
      <ul>
        {compras.map((compra) => (
          <li key={compra.id}>
            Usuário ID: {compra.usuario_id} - Endereço ID: {compra.endereco_id} - Data: {compra.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompraPage;
