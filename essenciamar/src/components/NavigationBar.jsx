import React from 'react';
import './navigation.css'; // vou sugerir CSS separado, mas pode juntar no seu CSS atual

const NavigationBar = ({ filtro, setFiltro }) => {
  return (
    <nav className="navigationbar">
      <input
        type="text"
        placeholder="Pesquise o Produto desejado:"
        className="campo-pesquisa"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <div className="controles">
        <button className="btn-primario">CONTROLE DE VENDA</button>
        <button className="btn-secundario">NOVO PRODUTO</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
