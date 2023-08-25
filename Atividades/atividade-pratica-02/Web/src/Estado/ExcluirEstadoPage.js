import React, { useEffect, useState } from 'react';
import api from '../api';

function ExcluirEstadoPage() {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    async function fetchEstados() {
      const response = await api.get('/estados');
      setEstados(response.data);
    }
    fetchEstados();
  }, []);

  const handleDelete = async (estadoId) => {
    try {
      await api.delete(`/estados/${estadoId}`);
      setEstados(estados.filter((estado) => estado.id !== estadoId));
    } catch (error) {
      console.error('Erro ao excluir estado:', error);
    }
  };

  return (
    <div>
      <h2>Excluir Estados</h2>
      <ul>
        {estados.map((estado) => (
          <li key={estado.id}>
            {estado.nome} - {estado.sigla}
            <button onClick={() => handleDelete(estado.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExcluirEstadoPage;
