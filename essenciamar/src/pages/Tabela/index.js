import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import './tabela.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap';

const Tabela = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  // Carrinho removido pois vamos enviar direto para Venda
  const [tasks, setTasks] = useState([
    {
      id: 1,
      produto: 'Óleo Essencial',
      preco: 'R$ 10,99',
      estoque: '50 unidades',
      descricao:
        'Óleo Essencial de Lavanda – 10ml. Óleo 100% puro e natural, com aroma suave e floral. Ideal para relaxar, aliviar o estresse e promover o bem-estar. Pode ser usado em difusores, massagens (diluído) ou banhos. Extraído das flores por destilação a vapor.'
    },
    {
      id: 2,
      produto: 'Sabonete Natural',
      preco: 'R$ 5,99',
      estoque: '30 unidades',
      descricao: 'Sabonete feito com ingredientes naturais, suave para a pele e biodegradável.'
    },
    {
      id: 3,
      produto: 'Creme Hidratante',
      preco: 'R$ 15,99',
      estoque: '25 unidades',
      descricao: 'Creme hidratante com propriedades nutritivas para manter sua pele macia e saudável.'
    },
    {
      id: 4,
      produto: 'Castanha',
      preco: 'R$ 15,99',
      estoque: '3Kg',
      descricao: 'Castanha-do-Pará embalada a vácuo. Ideal para lanches saudáveis e receitas.'
    }
  ]);

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
  
    const itemCarrinho = {
      ...produtoSelecionado,
      quantidade: valor,
      tipo: produtoSelecionado.estoque.includes('Kg') ? 'kg' : 'unidade'
    };
  
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoAtual.push(itemCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
  
    // Fecha modal
    const modalElement = document.getElementById('modalCarrinho');
    let modalInstance = Modal.getInstance(modalElement);
    if (!modalInstance) {
      modalInstance = new Modal(modalElement);
    }
    modalInstance.hide();
  
    setProdutoSelecionado(null);
    setQuantidade('');
    setErro('');
  
    // Aqui a mensagem de alerta
    alert('Produto adicionado ao carrinho com sucesso!');
  };
  
  

  useEffect(() => {
    if (location.state) {
      if (location.state.novoProduto) {
        setTasks([...tasks, location.state.novoProduto]);
      } else if (location.state.produtoEditado) {
        setTasks(
          tasks.map((task) =>
            task.id === location.state.produtoEditado.id ? location.state.produtoEditado : task
          )
        );
      }
    }
  }, [location.state]);

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
    const modalElement = document.getElementById('exampleModal');
    modalElement.querySelector('.modal-body').innerHTML = `
      <div class="descricao-container">
        <p><strong>Produto:</strong> ${produto.produto}</p>
        <p><strong>Preço:</strong> ${produto.preco}</p>
        <p><strong>Estoque:</strong> ${produto.estoque}</p>
        <p><strong>Descrição:</strong></p>
        <p>${produto.descricao}</p>
      </div>
    `;

    const modal = new Modal(modalElement);
    modal.show();
  };

  return (
    <div className="tabela-container">
      <header className="header">
        <h1 className="titulo-principal">ESSÊNCIA DO MAR - PONTAL DO PARANÁ</h1>
      </header>

      <NavigationBar filtro={filtro} setFiltro={setFiltro} />

      <table className="tabela-custom">
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
                <button className="btn-remove" onClick={() => removeTask(task.id)} title="Remover">
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <button
                  className="btn-info"
                  onClick={() => mostrarMaisInfo(task)}
                  title="Info"
                >
                  <span className="material-symbols-outlined">info</span>
                </button>
                <button
                  className="btn-info"
                  title="Adicionar ao Carrinho"
                  onClick={() => abrirModalCarrinho(task)}
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de informações do produto */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Informações do Produto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body"></div>
          </div>
        </div>
      </div>

      {/* Modal para adicionar ao carrinho */}
      <div
        className="modal fade"
        id="modalCarrinho"
        tabIndex="1"
        aria-labelledby="modalCarrinhoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalCarrinhoLabel">
                Adicionar ao Carrinho
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              {produtoSelecionado && (
                <>
                  <p>
                    <strong>Produto:</strong> {produtoSelecionado.produto}
                  </p>
                  <p>
                    <strong>Preço:</strong> {produtoSelecionado.preco}
                  </p>
                  <p>
                    <strong>Estoque:</strong> {produtoSelecionado.estoque}
                  </p>

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
                      onChange={(e) => {
                        setQuantidade(e.target.value);
                        setErro('');
                      }}
                      min={produtoSelecionado.estoque.includes('Kg') ? '0.001' : '1'}
                      step={produtoSelecionado.estoque.includes('Kg') ? '0.001' : '1'}
                    />
                  </div>

                  {erro && (
                    <div className="erro-aviso" role="alert">
                      {erro}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-success" onClick={handleAdicionarAoCarrinho}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabela;
