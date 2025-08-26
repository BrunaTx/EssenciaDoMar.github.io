import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoBackground from './logo.jpg'; 

const PrincipalContainer = styled.div`
  font-family: 'American Typewriter', serif;
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
`;

const GridEsquerda = styled.div`
  position: relative;
  background-color: #9ab991;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px; 
  overflow-y: auto;
  overflow-x: hidden;
`;

const GridDireita = styled.div`
  background-image: url(${logoBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const ControleProduto = styled.h1`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  margin: 0;
  font-size: 75px;
  color: #2a5554;
  font-weight: bold;
  font-family: 'American Typewriter', serif;
`;

const Voltar = styled.h1`
  position: relative;
  left: 3%;
  transform: translateX(-50%);
  white-space: nowrap;
  margin: 0;
  font-size: 20px;
  color: #2a5554;
  font-weight: bold;
  font-family: 'American Typewriter', serif;
  cursor: pointer;
`;

const ErroAviso = styled.p`
  color: #2a5554;
  font-family: 'American Typewriter', serif;
  font-weight: normal;
  font-size: 18px;
  margin: 10px 0;
`;

const InputEstilizado = styled.input`
  width: 320px;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #d6e4da;
  color: #2a5554;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  margin: 5px 0;
  font-family: 'American Typewriter', serif;

  &::placeholder {
    color: #2a5554;
    font-weight: normal;
  }
`;

const TotalContainer = styled.div`
  width: 100%;
  max-width: 350px;
  margin-top: 100px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelEstilizado = styled.label`
  display: block;
  color: #2a5554;
  font-family: 'American Typewriter', serif;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const TotalInput = styled.input`
  font-weight: bold;
  text-align: center;
  width: 320px;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #d6e4da;
  color: #2a5554;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  margin: 5px 0;
  font-family: 'American Typewriter', serif;
`;

const FiltroContainer = styled.div`
  width: 100%;
  max-width: 350px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BotoesContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const BotaoFiltro = styled.button`
  background-color: #2a5554;
  color: #d6e4da;
  font-weight: bold;
  width: 150px;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  margin: 5px 0;
  font-family: 'American Typewriter', serif;
`;

const ListaVendas = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const TituloLista = styled.h2`
  position: relative;
  color: #2a5554;
  text-align: center;
  left: 2%;
  font-size: 24px;
`;

const ListaVendasUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const VendaItem = styled.li`
  background-color: #d6e4da;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  color: #2a5554;
`;

const VendaCabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProdutosLista = styled.ul`
  margin-left: 20px;
`;

const ProdutoItem = styled.li`
  margin-bottom: 5px;
`;

const ProdutoNome = styled.div`
  font-weight: bold;
  color: #2a5554;
`;

const ProdutoDetalhes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const Controle = () => {
  const navigate = useNavigate();
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [totalVendas, setTotalVendas] = useState(0);
  const [erro, setErro] = useState('');
  const [vendasFiltradas, setVendasFiltradas] = useState([]);
  const [todasVendas, setTodasVendas] = useState([]);

  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas')) || [];
    setTodasVendas(vendasSalvas);
    setVendasFiltradas(vendasSalvas);
    calcularTotal(vendasSalvas);
  }, []);

  const calcularTotal = (vendas) => {
    const total = vendas.reduce((acc, venda) => {
      const totalVenda = venda.produtos.reduce((totalProd, produto) => {
        return totalProd + (produto.quantidade * produto.valorUnitario);
      }, 0);
      return acc + totalVenda;
    }, 0);
    setTotalVendas(total);
  };

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

  const limparFiltro = () => {
    setDataInicial('');
    setDataFinal('');
    setVendasFiltradas(todasVendas);
    calcularTotal(todasVendas);
    setErro('');
  };

  const formatarQuantidade = (produto) => {
    if (produto.tipo === 'kg') return `${produto.quantidade} kg`;
    return `${produto.quantidade} un`;
  };

  const formatarValorUnitario = (produto) => {
    if (produto.tipo === 'kg') return `R$ ${produto.valorUnitario.toFixed(2)}/kg`;
    return `R$ ${produto.valorUnitario.toFixed(2)} cada`;
  };

  return (
    <PrincipalContainer>
      <GridEsquerda>
        <ControleProduto>Controle de Vendas</ControleProduto>

        <TotalContainer>
          <LabelEstilizado>Total de Vendas:</LabelEstilizado>
          <TotalInput
            type="text"
            value={`R$ ${totalVendas.toFixed(2)}`}
            readOnly
          />
        </TotalContainer>

        <FiltroContainer>
          <LabelEstilizado>Filtrar por período:</LabelEstilizado>
          <InputEstilizado
            type="date"
            placeholder="Data inicial"
            value={dataInicial}
            onChange={e => setDataInicial(e.target.value)}
          />
          <InputEstilizado
            type="date"
            placeholder="Data final"
            value={dataFinal}
            onChange={e => setDataFinal(e.target.value)}
          />
          <BotoesContainer>
            <BotaoFiltro onClick={filtrarVendas}>Filtrar</BotaoFiltro>
            <BotaoFiltro onClick={limparFiltro}>Limpar</BotaoFiltro>
          </BotoesContainer>
        </FiltroContainer>

        {erro && <ErroAviso>{erro}</ErroAviso>}

        <ListaVendas>
          <TituloLista>Histórico de Vendas</TituloLista>
          <ListaVendasUl>
            {vendasFiltradas.map(venda => (
              <VendaItem key={venda.id}>
                <VendaCabecalho>
                  <span>Data: {venda.data}</span>
                  <span>Total: R$ {venda.produtos.reduce((total, prod) => total + (prod.quantidade * prod.valorUnitario), 0).toFixed(2)}</span>
                </VendaCabecalho>
                <ProdutosLista>
                  {venda.produtos.map((produto, index) => (
                    <ProdutoItem key={index}>
                      <ProdutoNome>{produto.nome}</ProdutoNome>
                      <ProdutoDetalhes>
                        {formatarQuantidade(produto)} - {formatarValorUnitario(produto)} - Total: R$ {(produto.quantidade * produto.valorUnitario).toFixed(2)}
                      </ProdutoDetalhes>
                    </ProdutoItem>
                  ))}
                </ProdutosLista>
              </VendaItem>
            ))}
          </ListaVendasUl>
        </ListaVendas>

        <Voltar onClick={() => navigate('/tabela')}>
          Voltar
        </Voltar>
      </GridEsquerda>

      <GridDireita />
    </PrincipalContainer>
  );
};

export default Controle;
