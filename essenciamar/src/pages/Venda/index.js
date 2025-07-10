import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap';
import './venda.css';
import { useNavigate } from 'react-router-dom';

const Venda = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [troco, setTroco] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(carrinhoSalvo);
  }, []);

  useEffect(() => {
    let soma = 0;
    carrinho.forEach((item) => {
      const precoUnit = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      soma += precoUnit * item.quantidade;
    });
    setTotal(soma.toFixed(2));
  }, [carrinho]);

  const removeItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const mostrarMaisInfo = (produto) => {
    const modalElement = document.getElementById('exampleModal');
    modalElement.querySelector('.modal-body').innerHTML = `
      <div class="descricao-container">
        <p><strong>Produto:</strong> ${produto.produto}</p>
        <p><strong>Preço Unitário:</strong> ${produto.preco}</p>
        <p><strong>Quantidade:</strong> ${produto.quantidade} ${produto.tipo}</p>
        <p><strong>Estoque:</strong> ${produto.estoque}</p>
        <p><strong>Descrição:</strong></p>
        <p>${produto.descricao}</p>
      </div>
    `;
    const modal = new Modal(modalElement);
    modal.show();
  };

  const calcularTroco = () => {
    const pago = parseFloat(valorPago.replace(',', '.'));
    if (!isNaN(pago) && total) {
      const trocoCalculado = (pago - total).toFixed(2);
      setTroco(trocoCalculado >= 0 ? trocoCalculado : "Valor insuficiente");
    }
  };

  const finalizarVenda = () => {
    if (carrinho.length === 0) {
      alert("Carrinho vazio! Adicione produtos antes de finalizar a venda.");
      return;
    }
  
    if (!formaPagamento) {
      alert("Selecione a forma de pagamento antes de finalizar a venda.");
      return;
    }
  
    if (formaPagamento === 'dinheiro') {
      const pago = parseFloat(valorPago.replace(',', '.'));
      const totalNum = parseFloat(total);
      if (isNaN(pago) || pago < totalNum) {
        alert("Valor pago insuficiente. Por favor, informe um valor igual ou maior que o total.");
        return;
      }
      

    }
  
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  
    const novaVenda = {
      id: Date.now(),
      data: new Date().toISOString().split('T')[0], // data no formato YYYY-MM-DD
      produtos: carrinho.map(item => ({
        nome: item.produto,
        quantidade: item.quantidade,
        tipo: item.tipo,
        valorUnitario: parseFloat(item.preco.replace('R$', '').replace(',', '.')),
        descricao: item.descricao || ''
      }))
    };
  
    vendas.push(novaVenda);
    localStorage.setItem('vendas', JSON.stringify(vendas));
  
    alert('Venda finalizada!');
    navigate('/tabela');
    setCarrinho([]);
    localStorage.removeItem('carrinho');
    setFormaPagamento('');
    setValorPago('');
    setTroco(null);
    setTotal(0);
  };
  

  return (
    <div className="tabela-container">
      <header className="header">
        <h1 className="titulo-principal">ESSÊNCIA DO MAR - PONTAL DO PARANÁ</h1>
      </header>

      <table className="tabela-custom">
        <thead>
          <tr>
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>PREÇO UNITÁRIO</th>
            <th>PREÇO TOTAL</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>Carrinho vazio</td>
            </tr>
          )}
          {carrinho.map((item) => {
            const precoUnit = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
            const precoTotal = (precoUnit * item.quantidade).toFixed(2);
            return (
              <tr key={item.id}>
                <td>{item.produto}</td>
                <td>{item.quantidade} {item.tipo}</td>
                <td>R$ {precoUnit.toFixed(2).replace('.', ',')}</td>
                <td>R$ {precoTotal.replace('.', ',')}</td>
                <td>
                  <button className="btn-remove" onClick={() => removeItem(item.id)} title="Remover">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <button className="btn-info" onClick={() => mostrarMaisInfo(item)} title="Info">
                    <span className="material-symbols-outlined">info</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="botoes-container">
        <button className="btn-vender" onClick={finalizarVenda}>Finalizar Venda</button>
        <input
          type="text"
          className="form-control resumo-total-input"
          value={`R$ ${total.toString().replace('.', ',')}`}
          readOnly
        />
      </div>

      <div className="pagamento-container">
        <label>Forma de Pagamento:</label>
        <select
          className="form-select"
          value={formaPagamento}
          onChange={(e) => {
            setFormaPagamento(e.target.value);
            setTroco(null);
            setValorPago('');
          }}
        >
          <option value="">Selecione</option>
          <option value="cartao">Cartão</option>
          <option value="dinheiro">Dinheiro</option>
        </select>

        {formaPagamento === 'dinheiro' && (
          <>
            <label>Valor entregue:</label>
            <input
              type="number"
              className="form-control"
              value={valorPago}
              onChange={(e) => setValorPago(e.target.value)}
              placeholder="R$"
            />
            <button className="btn-vender" onClick={calcularTroco}>Calcular Troco</button>
            {troco !== null && (
              <p><strong>Troco:</strong> R$ {typeof troco === 'string' ? troco : troco.toString().replace('.', ',')}</p>
            )}
          </>
        )}
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Informações do Produto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venda;
