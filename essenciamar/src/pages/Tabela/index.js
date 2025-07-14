import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import ProductModal from '../../components/ProductModal';
import CartModal from '../../components/CartModal';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
  const location = useLocation();
  const navigate = useNavigate();

  const [erro, setErro] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtoSelecionadoParaInfo, setProdutoSelecionadoParaInfo] = useState(null);
  const [quantidade, setQuantidade] = useState('');

  // ✅ useState CORRETO
  const [tasks, setTasks] = useState(() => {
    const dadosSalvos = localStorage.getItem('produtos');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    } else {
      return [
        {
          id: 1,
          produto: 'Óleo Essencial',
          preco: 'R$ 10,99',
          estoque: '50 unidades',
          descricao:
            'Óleo Essencial de Lavanda – 10ml. Óleo 100% puro e natural, com aroma suave e floral. Ideal para relaxar, aliviar o estresse e promover o bem-estar. Pode ser usado em difusores, massagens (diluído) ou banhos. Extraído das flores por destilação a vapor.',
        },
        {
          id: 2,
          produto: 'Sabonete Natural',
          preco: 'R$ 5,99',
          estoque: '30 unidades',
          descricao: 'Sabonete feito com ingredientes naturais, suave para a pele e biodegradável.',
        },
        {
          id: 3,
          produto: 'Creme Hidratante',
          preco: 'R$ 15,99',
          estoque: '25 unidades',
          descricao: 'Creme hidratante com propriedades nutritivas para manter sua pele macia e saudável.',
        },
        {
          id: 4,
          produto: 'Castanha',
          preco: 'R$ 15,99',
          estoque: '3Kg',
          descricao: 'Castanha-do-Pará embalada a vácuo. Ideal para lanches saudáveis e receitas.',
        },
      ];
    }
  });
  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (location.state) {
      const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
      let novaLista = [...produtosSalvos];
  
      if (location.state.novoProduto) {
        novaLista.push(location.state.novoProduto);
      } else if (location.state.produtoEditado) {
        novaLista = novaLista.map((task) =>
          task.id === location.state.produtoEditado.id
            ? location.state.produtoEditado
            : task
        );
      }
  
      setTasks(novaLista);
      localStorage.setItem('produtos', JSON.stringify(novaLista));
  
      // Limpa o estado de navegação após usar
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);
  

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
  
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoAtual.push(itemCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
  
    const modalElement = document.getElementById('modalCarrinho');
    let modalInstance = Modal.getInstance(modalElement);
    if (!modalInstance) {
      modalInstance = new Modal(modalElement);
    }
    modalInstance.hide();
  
    setProdutoSelecionado(null);
    setQuantidade('');
    setErro('');
    alert('Produto adicionado ao carrinho com sucesso!');
  };

  const [filtro, setFiltro] = useState('');

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const removerAcentos = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const produtosFiltrados = tasks.filter((task) =>
    removerAcentos(task.produto).includes(removerAcentos(filtro))
  );

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
                  <Link
                    to="/edicao"
                    state={{ produtoParaEditar: task }}
                    className="btn-edit"
                    title="Editar"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </Link>
                  <BotaoAcao className="btn-remove" onClick={() => removeTask(task.id)} title="Remover">
                    <span className="material-symbols-outlined">delete</span>
                  </BotaoAcao>
                  <BotaoAcao
                    className="btn-info"
                    onClick={() => mostrarMaisInfo(task)}
                    title="Info"
                  >
                    <span className="material-symbols-outlined">info</span>
                  </BotaoAcao>
                  <BotaoAcao
                    className="btn-info"
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