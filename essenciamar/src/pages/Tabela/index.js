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

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/produtos');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
  
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (location.state?.novoProduto) {
      setTasks(prevTasks => {
        const produtoJaExiste = prevTasks.some(
          p => p.id === location.state.novoProduto.id
        );
        if (produtoJaExiste) return prevTasks; 
        return [...prevTasks, location.state.novoProduto];
      });
      navigate(location.pathname, { replace: true });
    }
  
    if (location.state?.produtoEditado) {
      setTasks(prevTasks => {
        return prevTasks.map(task =>
          task.id === location.state.produtoEditado.id
            ? location.state.produtoEditado
            : task
        );
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  
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

  const [carrinho, setCarrinho] = useState([]);

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
  
    setCarrinho(prev => {
      const novoCarrinho = [...prev, itemCarrinho];
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); // <-- SALVA NO LOCALSTORAGE
      return novoCarrinho;
    });
  
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

  const removeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('');
      }
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
  
    }
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