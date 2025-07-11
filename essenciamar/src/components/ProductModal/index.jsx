// components/ProductModal/index.jsx
import React from 'react';
import { Modal } from 'bootstrap';
import './product.css';

const ProductModal = ({ produto }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content product-modal-content">
          <div className="modal-header product-modal-header">
            <h5 className="modal-title product-modal-title">Informações do Produto</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body product-modal-body">
            {produto && (
              <div className="product-descricao-container">
                <p><strong>Produto:</strong> {produto.produto}</p>
                <p><strong>Preço:</strong> {produto.preco}</p>
                <p><strong>Estoque:</strong> {produto.estoque}</p>
                <p><strong>Descrição:</strong></p>
                <p>{produto.descricao}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;