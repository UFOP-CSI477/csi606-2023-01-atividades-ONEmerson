import React, { useEffect, useState } from 'react';
import api from '../api';
import EstadoForm from './EstadoForm';

function EstadoPage() {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    async function fetchEstados() {
      const response = await api.get('/estados');
      setEstados(response.data);
    }
    fetchEstados();
  }, []);

  return (
    <div>
      <h2>Estados</h2>
      <EstadoForm />
      <ul>
        {estados.map((estado) => (
          <li key={estado.id}>{estado.nome} - {estado.sigla}</li>
        ))}
      </ul>
    </div>
  );
}

export default EstadoPage;
