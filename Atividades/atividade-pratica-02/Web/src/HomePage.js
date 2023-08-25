// src/HomePage.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import EstadoForm from './Estado/EstadoForm';
import EstadoPage from './Estado/EstadoPage';
import EditarEstadoPage from './Estado/EditarEstadoPage';
import ExcluirEstadoPage from './Estado/ExcluirEstadoPage';

import EnderecoForm from './Endereco/EnderecoForm';
import EnderecoPage from './Endereco/EnderecoPage';
import EditarEnderecoPage from './Endereco/EditarEnderecoPage';
import ExcluirEnderecoPage from './Endereco/ExcluirEnderecoPage';

import CompraForm from './Compra/CompraForm';
import CompraPage from './Compra/CompraPage';
import EditarCompraPage from './Compra/EditarCompraPage';
import ExcluirCompraPage from './Compra/ExcluirCompraPage';

import ProdutoForm from './Produto/ProdutoForm';
import ProdutoPage from './Produto/ProdutoPage';
import EditarProdutoPage from './Produto/EditarProdutoPage';
import ExcluirProdutoPage from './Produto/ExcluirProdutoPage';

import './App.css';

function HomePage() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/estados">Estados</Link>
                <ul>
                  <li>
                    <Link to="/estados/criar">Criar Estado</Link>
                  </li>
                  <li>
                    <Link to="/estados/editar">Editar Estado</Link>
                  </li>
                  <li>
                    <Link to="/estados/excluir">Excluir Estado</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/enderecos">Endereço</Link>
                <ul>
                  <li>
                    <Link to="/enderecos/criar">Criar Endereço</Link>
                  </li>
                  <li>
                    <Link to="/enderecos/editar">Editar Endereço</Link>
                  </li>
                  <li>
                    <Link to="/enderecos/excluir">Excluir Endereço</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/compras">Compra</Link>
                <ul>
                  <li>
                    <Link to="/compras/criar">Criar Compra</Link>
                  </li>
                  <li>
                    <Link to="/compras/editar">Editar Compra</Link>
                  </li>
                  <li>
                    <Link to="/compras/excluir">Excluir Compra</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/produtos">Produtos</Link>
                <ul>
                  <li>
                    <Link to="/produtos/criar">Criar Produto</Link>
                  </li>
                  <li>
                    <Link to="/produtos/editar">Editar Produto</Link>
                  </li>
                  <li>
                    <Link to="/produtos/excluir">Excluir Produto</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
  
          <Routes>
            <Route path="/estados" element={<EstadoPage />} />
            <Route path="/estados/criar" element={<EstadoForm />} />
            <Route path="/estados/editar" element={<EditarEstadoPage />} />
            <Route path="/estados/excluir" element={<ExcluirEstadoPage />} />
            
            <Route path="/enderecos" element={<EnderecoPage />} />
            <Route path="/enderecos/criar" element={<EnderecoForm />} />
            <Route path="/enderecos/editar" element={<EditarEnderecoPage />} />
            <Route path="/enderecos/excluir" element={<ExcluirEnderecoPage />} />

            <Route path="/compras" element={<CompraPage />} />
            <Route path="/compras/criar" element={<CompraForm />} />
            <Route path="/compras/editar" element={<EditarCompraPage />} />
            <Route path="/compras/excluir" element={<ExcluirCompraPage />} />

            <Route path="/produtos" element={<ProdutoPage />} />
            <Route path="/produtos/criar" element={<ProdutoForm />} />
            <Route path="/produtos/editar/:id" element={<EditarProdutoPage />} />
            <Route path="/produtos/excluir/:id" element={<ExcluirProdutoPage />} />          
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default HomePage;