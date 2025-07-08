import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import './tabela.css';

const Tabela = () => {
  const [tasks, setTasks] = useState([
    { id: 1, produto: 'Óleo Essencial', preco: 'R$ 10,99', estoque: '50 unidades' },
    { id: 2, produto: 'Sabonete Natural', preco: 'R$ 5,99', estoque: '30 unidades' },
    { id: 3, produto: 'Creme Hidratante', preco: 'R$ 15,99', estoque: '25 unidades' }
  ]);

  const [filtro, setFiltro] = useState('');

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Função para mostrar mais informações do produto
  const mostrarMaisInfo = (produto) => {
    alert(`Produto: ${produto.produto}\nPreço: ${produto.preco}\nEstoque: ${produto.estoque}`);
  };

  const produtosFiltrados = tasks.filter(task =>
    task.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="conteudo">
      <header className="header">
        <h1 className="titulo-principal">ESSÊNCIA DO MAR - PONTAL DO PARANÁ</h1>
      </header>

      {/* Navbar com pesquisa e botões */}
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
                <button className="btn-edit">Editar</button>
                <button
                  className="btn-remove"
                  onClick={() => removeTask(task.id)}
                >
                  Remover
                </button>
                <button
                  className="btn-info"
                  onClick={() => mostrarMaisInfo(task)}
                >
                  Mostrar Mais
                </button>
                <button
                  className="btn-info"
                  onClick={() => mostrarMaisInfo(task)}
                >
                  Vender
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rodapé */}
      <footer>
        
       
      </footer>
    </div>
  );
};

export default Tabela;
