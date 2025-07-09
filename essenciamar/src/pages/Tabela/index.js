import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import './tabela.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap';

const Tabela = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      produto: 'Óleo Essencial', 
      preco: 'R$ 10,99', 
      estoque: '50 unidades',
      descricao: 'Óleo Essencial de Lavanda – 10ml. Óleo 100% puro e natural...'
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
  }
]);

 useEffect(() => {
    if (location.state && location.state.novoProduto) {
      setTasks([...tasks, location.state.novoProduto]);
    }
  }, [location.state]);


  const [filtro, setFiltro] = useState('');

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const removerAcentos = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const produtosFiltrados = tasks.filter(task =>
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
                <button className="btn-edit" title="Editar">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="btn-remove" onClick={() => removeTask(task.id)} title="Remover">
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <button className="btn-info" onClick={() => mostrarMaisInfo(task)} title="Info">
                  <span className="material-symbols-outlined">info</span>
                </button>
                <button className="btn-info" title="Vender">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Informações do Produto</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
              </div>
            <div className="modal-body">
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Tabela;
