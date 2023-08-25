import React, { useEffect, useState } from 'react';
import api from '../api';
import EnderecoForm from './EnderecoForm';

function EnderecoPage() {
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    async function fetchEnderecos() {
      const response = await api.get('/enderecos');
      setEnderecos(response.data);
    }
    fetchEnderecos();
  }, []);

  return (
    <div>
      <h2>Endereços</h2>
      <EnderecoForm />
      <ul>
        {enderecos.map((endereco) => (
          <li key={endereco.id}>
            Usuário ID: {endereco.usuario_id}, Rua: {endereco.rua}, Número: {endereco.numero}, Bairro: {endereco.bairro},
            Cidade ID: {endereco.cidade_id}, Telefone: {endereco.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnderecoPage;
