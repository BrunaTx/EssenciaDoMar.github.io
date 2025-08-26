import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap';
import styled from 'styled-components';

const GlobalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    font-family: 'Material Symbols Outlined';
    font-size: 24px;
    color: white;
    vertical-align: middle;
  }

  body {
    background-color: #9ab991;
    font-family: 'American Typewriter', serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const TabelaContainer = styled.div`
  background-color: #9ab991;
  font-family: 'American Typewriter', serif;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #2a5554;
  padding: 15px;
  width: 100%;
  margin-bottom: auto;
`;

const TituloPrincipal = styled.h1`
  font-size: 60px;
  color: white;
  margin: 0;
`;

const TabelaCustom = styled.table`
  width: 100%;
  margin-bottom: 30px;
  background-color: #9ab991;
  border-collapse: collapse;

  th {
    background-color: #2a5554;
    color: white;
    padding: 12px;
    text-align: center;
    border: 2px solid white;
  }

  td {
    padding: 12px;
    text-align: center;
    color: white;
    border: 2px solid white;
  }

  tbody tr:nth-child(even) {
    background-color: #9ab991;
  }

  tbody tr:nth-child(odd) {
    background-color: #2a5554;
  }
`;

const BotaoAcao = styled.button`
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
`;

const PagamentoContainer = styled.div`
  width: 400px;
  margin-left: 68%;
  margin-bottom: 30px;
  font-family: 'American Typewriter', serif;
  color: #2a5554;
  font-size: 20px;
`;

const BotaoVender = styled.button`
  background-color: #2a5554;
  border: none;
  color: white;
  padding: 10px 20px;
  font-family: 'American Typewriter', serif;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const InputPagamento = styled.input`
  background-color: #f0f7f2;
  border-radius: 10px;
  border: 1px solid #2a5554;
  color: #2a5554;
  font-size: 16px;
  font-family: 'American Typewriter', serif;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px 12px;
`;

const SelectPagamento = styled.select`
  margin-bottom: 10px;
  background-color: #f0f7f2;
  border: 1px solid #2a5554;
  color: #2a5554;
  font-family: 'American Typewriter', serif;
  width: 100%;
  padding: 8px 12px;
  border-radius: 10px;
`;

const BotoesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 68%;
  margin-bottom: 30px;
`;

const ResumoTotalInput = styled.input`
  width: 160px;
  background-color: #f0f7f2;
  border: 1px solid #2a5554;
  color: #2a5554;
  font-size: 18px;
  font-family: 'American Typewriter', serif;
  padding: 6px 12px;
  margin-right: 3%;
  border-radius: 8px;
  text-align: center;
`;

const ModalEstilizado = styled.div`
  .modal-content {
    background-color: #9ab991;
    border: 3px solid white;
  }
  
  .modal-header {
    background-color: white;
    border-bottom: 2px solid #2a5554;
  }
  
  .modal-title {
    color: #2a5554;
    font-family: 'American Typewriter', serif;
  }
  
  .descricao-container {
    color: #2a5554;
    font-family: 'American Typewriter', serif;
  }
`;

const Venda = () => {
  const [carrinho, setCarrinho] = useState([
    { id: 1, produto: 'Óleo Essencial', preco: '25,00', quantidade: 2, tipo: 'unidade', descricao: 'Óleo essencial relaxante' },
    { id: 2, produto: 'Sabonete Artesanal', preco: '15,00', quantidade: 1, tipo: 'kg', descricao: 'Sabonete feito à mão' },
  ]);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [troco, setTroco] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let soma = 0;
    carrinho.forEach((item) => {
      const precoUnit = parseFloat(item.preco.replace(',', '.'));
      soma += precoUnit * item.quantidade;
    });
    setTotal(soma.toFixed(2));
  }, [carrinho]);

  const removeItem = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const mostrarMaisInfo = (produto) => {
    const modalElement = document.getElementById('exampleModal');
    modalElement.querySelector('.modal-body').innerHTML = `
      <div class="descricao-container">
        <p><strong>Produto:</strong> ${produto.produto}</p>
        <p><strong>Preço Unitário:</strong> R$ ${produto.preco}</p>
        <p><strong>Quantidade:</strong> ${produto.quantidade} ${produto.tipo}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
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
      alert("Carrinho vazio!");
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
        alert("Valor pago insuficiente. Informe um valor igual ou maior que o total.");
        return;
      } else {
        const trocoCalculado = (pago - totalNum).toFixed(2);
        setTroco(trocoCalculado);
      }
    }

    alert("Venda finalizada!");
    setCarrinho([]);
    setFormaPagamento('');
    setValorPago('');
    setTroco(null);
    setTotal(0);
  };

  return (
    <GlobalStyle>
      <TabelaContainer>
        <Header>
          <TituloPrincipal>ESSÊNCIA DO MAR - PONTAL DO PARANÁ</TituloPrincipal>
        </Header>

        <TabelaCustom>
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
              const precoUnit = parseFloat(item.preco.replace(',', '.'));
              const precoTotal = (precoUnit * item.quantidade).toFixed(2);
              return (
                <tr key={item.id}>
                  <td>{item.produto}</td>
                  <td>{item.quantidade} {item.tipo}</td>
                  <td>R$ {precoUnit.toFixed(2).replace('.', ',')}</td>
                  <td>R$ {precoTotal.replace('.', ',')}</td>
                  <td>
                    <BotaoAcao onClick={() => removeItem(item.id)} title="Remover">
                      <span className="material-symbols-outlined">delete</span>
                    </BotaoAcao>
                    <BotaoAcao onClick={() => mostrarMaisInfo(item)} title="Info">
                      <span className="material-symbols-outlined">info</span>
                    </BotaoAcao>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TabelaCustom>

        <BotoesContainer>
          <BotaoVender onClick={finalizarVenda}>Finalizar Venda</BotaoVender>
          <ResumoTotalInput type="text" readOnly value={`R$ ${total.toString().replace('.', ',')}`} />
        </BotoesContainer>

        <PagamentoContainer>
          <label>Forma de Pagamento:</label>
          <SelectPagamento value={formaPagamento} onChange={(e) => { setFormaPagamento(e.target.value); setTroco(null); setValorPago(''); }}>
            <option value="">Selecione</option>
            <option value="cartao">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
          </SelectPagamento>

          {formaPagamento === 'dinheiro' && (
            <>
              <label>Valor entregue:</label>
              <InputPagamento type="number" value={valorPago} onChange={(e) => setValorPago(e.target.value)} placeholder="R$" />
              <BotaoVender onClick={calcularTroco}>Calcular Troco</BotaoVender>
              {troco !== null && (
                <p><strong>Troco:</strong> R$ {typeof troco === 'string' ? troco : troco.toString().replace('.', ',')}</p>
              )}
            </>
          )}
        </PagamentoContainer>

        <ModalEstilizado>
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
        </ModalEstilizado>
      </TabelaContainer>
    </GlobalStyle>
  );
};

export default Venda;
