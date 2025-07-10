import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './controle.css';

function Controle() {
  const navigate = useNavigate();
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [totalVendas, setTotalVendas] = useState(0);
  const [erro, setErro] = useState('');
  const [vendasFiltradas, setVendasFiltradas] = useState([]);
  const [todasVendas, setTodasVendas] = useState([]);

  // Carrega vendas do localStorage ao montar o componente
  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas')) || [];
    setTodasVendas(vendasSalvas);
    setVendasFiltradas(vendasSalvas);
    calcularTotal(vendasSalvas);
  }, []);

  // Função para calcular total geral
  const calcularTotal = (vendas) => {
    const total = vendas.reduce((acc, venda) => {
      const totalVenda = venda.produtos.reduce((totalProd, produto) => {
        return totalProd + (produto.quantidade * produto.valorUnitario);
      }, 0);
      return acc + totalVenda;
    }, 0);
    setTotalVendas(total);
  };

  // Função para filtrar vendas por intervalo de datas
  const filtrarVendas = () => {
    if (!dataInicial || !dataFinal) {
      setErro('Por favor, informe ambas as datas para filtrar.');
      return;
    }

    if (dataInicial > dataFinal) {
      setErro('Data inicial não pode ser maior que data final.');
      return;
    }

    setErro('');

    const vendasFilt = todasVendas.filter(venda => {
      return venda.data >= dataInicial && venda.data <= dataFinal;
    });

    setVendasFiltradas(vendasFilt);
    calcularTotal(vendasFilt);
  };

  // Limpar filtro e mostrar todas as vendas
  const limparFiltro = () => {
    setDataInicial('');
    setDataFinal('');
    setVendasFiltradas(todasVendas);
    calcularTotal(todasVendas);
    setErro('');
  };

  // Formatação de quantidade
  const formatarQuantidade = (produto) => {
    if (produto.tipo === 'kg') {
      return `${produto.quantidade} kg`;
    } else {
      return `${produto.quantidade} un`;
    }
  };

  // Formatação de valor unitário
  const formatarValorUnitario = (produto) => {
    if (produto.tipo === 'kg') {
      return `R$ ${produto.valorUnitario.toFixed(2)}/kg`;
    } else {
      return `R$ ${produto.valorUnitario.toFixed(2)} cada`;
    }
  };

  return (
    <div className="principal-container">
      <div className="grid-esquerda">
        <h1 className="controle-produto">Controle de Vendas</h1>

        <div className="total-container">
          <label>Total de Vendas:</label>
          <input
            type="text"
            value={`R$ ${totalVendas.toFixed(2)}`}
            readOnly
            className="total-input"
          />
        </div>

        <div className="filtro-container">
          <label>Filtrar por período:</label>
          <input
            type="date"
            placeholder="Data inicial"
            value={dataInicial}
            onChange={e => setDataInicial(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data final"
            value={dataFinal}
            onChange={e => setDataFinal(e.target.value)}
          />
          <div className="botoes-container">
            <button onClick={filtrarVendas}>Filtrar</button>
            <button onClick={limparFiltro}>Limpar</button>
          </div>
        </div>

        {erro && <p className="erro-aviso">{erro}</p>}

        <div className="lista-vendas">
          <h2>Histórico de Vendas</h2> 
            <ul>
              {vendasFiltradas.map(venda => (
                <li key={venda.id} className="venda-item">
                  <div className="venda-cabecalho">
                    <span>Data: {venda.data}</span>
                    <span>Total: R$ {venda.produtos.reduce((total, prod) => total + (prod.quantidade * prod.valorUnitario), 0).toFixed(2)}</span>
                  </div>
                  <ul className="produtos-lista">
                    {venda.produtos.map((produto, index) => (
                      <li key={index}>
                        <div className="produto-nome">{produto.nome}</div>
                        <div className="produto-detalhes">
                          {formatarQuantidade(produto)} - {formatarValorUnitario(produto)} - Total: R$ {(produto.quantidade * produto.valorUnitario).toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
        </div>

        <h1 className="voltar" onClick={() => navigate('/tabela')}>
          Voltar
        </h1>
      </div>

      <div className="grid-direita" />
    </div>
  );
}

export default Controle;
