import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';

const NavigationBar = ({ filtro, setFiltro }) => {
  return (
    <nav className="navigationbar">
      <div className="pesquisa-container">
        <input
          type="text"
          placeholder="Pesquise o Produto"
          className="campo-pesquisa"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <span className="material-symbols-outlined btn-pesquisa">search</span>
      </div>
      <div className="controles">
        <button className="btn-primario btn-venda">
          <Link to="/venda" className="material-symbols-outlined principal-link">
            add_shopping_cart
          </Link>
        </button>
        <button className="btn-primario btn-venda">
          <Link to="/controle" className="principal-link">
            Controle de Venda
          </Link>
          <span className="material-symbols-outlined">order_approve</span>
        </button>
        <button className="btn-secundario btn-mais">
          <Link to="/cadastro" className="principal-link">
            Novo Produto
          </Link>
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
