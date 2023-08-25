// src/Estado/EditarEstadoPage.js
import React, { useEffect, useState } from 'react';
import api from '../api';

function EditarEstadoPage() {
  const [estados, setEstados] = useState([]);
  const [editingState, setEditingState] = useState(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedSigla, setEditedSigla] = useState('');

  useEffect(() => {
    async function fetchEstados() {
      const response = await api.get('/estados');
      setEstados(response.data);
    }
    fetchEstados();
  }, []);

  const handleEdit = (estado) => {
    setEditingState(estado);
    setEditedNome(estado.nome);
    setEditedSigla(estado.sigla);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/estados/${editingState.id}`, {
        nome: editedNome,
        sigla: editedSigla,
      });

      setEstados(estados.map((estado) => (estado.id === editingState.id ? { ...estado, nome: editedNome, sigla: editedSigla } : estado)));
      setEditingState(null);
    } catch (error) {
      console.error('Erro ao editar estado:', error);
    }
  };

  return (
    <div>
      <h2>Editar Estados</h2>
      <ul>
        {estados.map((estado) => (
          <li key={estado.id}>
            {estado.nome} - {estado.sigla}
            {editingState && editingState.id === estado.id ? (
              <div>
                <input type="text" value={editedNome} onChange={(e) => setEditedNome(e.target.value)} />
                <input type="text" value={editedSigla} onChange={(e) => setEditedSigla(e.target.value)} />
                <button onClick={handleSaveEdit}>Salvar</button>
              </div>
            ) : (
              <button onClick={() => handleEdit(estado)}>Editar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditarEstadoPage;
