// components/CartModal/index.js
import React from 'react';
import { Modal } from 'bootstrap';
import './cart.css'; // Importando o CSS tradicional

const CartModal = ({ produtoSelecionado, quantidade, setQuantidade, erro, onAdicionar }) => {
  return (
    <div className="modal fade" id="modalCarrinho" tabIndex="1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Adicionar ao Carrinho</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            {produtoSelecionado && (
              <>
                <p><strong>Produto:</strong> {produtoSelecionado.produto}</p>
                <p><strong>Preço:</strong> {produtoSelecionado.preco}</p>
                <p><strong>Estoque:</strong> {produtoSelecionado.estoque}</p>

                <div className="form-group mt-3">
                  <label htmlFor="quantidadeInput">
                    {produtoSelecionado.estoque.includes('Kg') 
                      ? 'Digite a quantidade em quilos (Kg)' 
                      : 'Digite a quantidade em unidades'}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantidadeInput"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min={produtoSelecionado.estoque.includes('Kg') ? '0.001' : '1'}
                    step={produtoSelecionado.estoque.includes('Kg') ? '0.001' : '1'}
                  />
                </div>

                {erro && <div className="erro-aviso">{erro}</div>}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={onAdicionar}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;