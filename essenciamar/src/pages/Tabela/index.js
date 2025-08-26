import React, { useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import ProductModal from '../../components/ProductModal';
import CartModal from '../../components/CartModal';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Modal } from 'bootstrap';

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

const TabelaEstilizada = styled.table`
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

const MensagemErro = styled.div`
  color: #2a5554;
  font-family: 'American Typewriter', serif;
  font-weight: normal;
  font-size: 18px;
  margin-top: 2px;
  margin-bottom: 15px;
`;

const Tabela = () => {
  const [erro, setErro] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtoSelecionadoParaInfo, setProdutoSelecionadoParaInfo] = useState(null);
  const [quantidade, setQuantidade] = useState('');

  const [carrinho, setCarrinho] = useState([]);
  const [filtro, setFiltro] = useState('');

  // Dados de exemplo sem backend
  const [tasks, setTasks] = useState([
    { id: 1, produto: 'Óleo Essencial', preco: 'R$ 25,00', estoque: '5 unidades' },
    { id: 2, produto: 'Sabonete Artesanal', preco: 'R$ 15,00', estoque: '2 Kg' },
    { id: 3, produto: 'Vela Aromática', preco: 'R$ 20,00', estoque: '10 unidades' },
  ]);

  const removerAcentos = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const produtosFiltrados = tasks.filter((task) =>
    removerAcentos(task.produto).includes(removerAcentos(filtro))
  );

  const verificarEstoqueDisponivel = (produto, quantidadeDesejada) => {
    if (produto.estoque.includes('Kg')) {
      const estoqueAtual = parseFloat(produto.estoque.replace('Kg', '').trim());
      return quantidadeDesejada <= estoqueAtual;
    } else {
      const estoqueAtual = parseInt(produto.estoque.replace('unidades', '').trim());
      return quantidadeDesejada <= estoqueAtual;
    }
  };

  const abrirModalCarrinho = (produto) => {
    setProdutoSelecionado(produto);
    setQuantidade('');
    setErro('');
    const modal = new Modal(document.getElementById('modalCarrinho'));
    modal.show();
  };

  const handleAdicionarAoCarrinho = () => {
    const valor = Number(quantidade);

    if (
      !quantidade ||
      isNaN(valor) ||
      valor <= 0 ||
      (produtoSelecionado.estoque.includes('Kg') && valor < 0.01) ||
      (!produtoSelecionado.estoque.includes('Kg') && !Number.isInteger(valor))
    ) {
      setErro('Por favor, preencha os dados da venda corretamente.');
      return;
    }

    if (!verificarEstoqueDisponivel(produtoSelecionado, valor)) {
      setErro('Quantidade solicitada maior que o estoque disponível.');
      return;
    }

    const itemCarrinho = {
      ...produtoSelecionado,
      quantidade: valor,
      tipo: produtoSelecionado.estoque.includes('Kg') ? 'kg' : 'unidade'
    };

    setCarrinho(prev => [...prev, itemCarrinho]);

    const modalElement = document.getElementById('modalCarrinho');
    let modalInstance = Modal.getInstance(modalElement);
    if (!modalInstance) modalInstance = new Modal(modalElement);
    modalInstance.hide();

    setProdutoSelecionado(null);
    setQuantidade('');
    setErro('');
    alert('Produto adicionado ao carrinho com sucesso!');
  };

  const mostrarMaisInfo = (produto) => {
    setProdutoSelecionadoParaInfo(produto);
    const modal = new Modal(document.getElementById('exampleModal'));
    modal.show();
  };

  return (
    <GlobalStyle>
      <TabelaContainer>
        <Header>
          <TituloPrincipal>ESSÊNCIA DO MAR - PONTAL DO PARANÁ</TituloPrincipal>
        </Header>

        <NavigationBar filtro={filtro} setFiltro={setFiltro} />

        <TabelaEstilizada>
          <thead>
            <tr>
              <th>PRODUTO</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
  {produtosFiltrados.map((task) => (
    <tr key={task.id}>
      <td>{task.produto}</td>
      <td>{task.preco}</td>
      <td>{task.estoque}</td>
      <td>
        <BotaoAcao onClick={() => alert(`Editar: ${task.produto}`)} title="Editar">
          <span className="material-symbols-outlined">edit</span>
        </BotaoAcao>

        <BotaoAcao onClick={() => mostrarMaisInfo(task)} title="Info">
          <span className="material-symbols-outlined">info</span>
        </BotaoAcao>

        <BotaoAcao
          title="Adicionar ao Carrinho"
          onClick={() => abrirModalCarrinho(task)}
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </BotaoAcao>
      </td>
    </tr>
  ))}
</tbody>

        </TabelaEstilizada>

        <ProductModal produto={produtoSelecionadoParaInfo} />
        <CartModal 
          produtoSelecionado={produtoSelecionado}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          erro={erro}
          onAdicionar={handleAdicionarAoCarrinho}
        />
      </TabelaContainer>
    </GlobalStyle>
  );
};

export default Tabela;
