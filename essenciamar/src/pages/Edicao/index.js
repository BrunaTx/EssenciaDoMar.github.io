import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './edicao.css';

function Edicao() {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(null);
  const [preco, setPreco] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoMedida, setTipoMedida] = useState('unidade');
  const [quantidadeUnidade, setQuantidadeUnidade] = useState('');
  const [pesoKg, setPesoKg] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (location.state && location.state.produtoParaEditar) {
      const produto = location.state.produtoParaEditar;
      setId(produto.id);
      
      const precoNumerico = produto.preco.replace('R$ ', '').replace(',', '.');
      setPreco(precoNumerico);
      
      setNome(produto.produto);
      setDescricao(produto.descricao);
      
      if (produto.estoque.includes('unidades')) {
        setTipoMedida('unidade');
        setQuantidadeUnidade(produto.estoque.replace(' unidades', ''));
      } else {
        setTipoMedida('kg');
        setPesoKg(produto.estoque.replace(' Kg', ''));
      }
    }
  }, [location.state]);

  const handleSalvar = () => {
    const precoFormatado = preco.trim().replace(',', '.');
    const precoNumero = parseFloat(precoFormatado);

    if (
      !preco.trim() &&
      !nome.trim() &&
      !descricao.trim() &&
      !quantidadeUnidade.trim() &&
      !pesoKg.trim()
    ) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (!preco || isNaN(precoNumero)) {
      setErro('Por favor, informe um preço válido (somente números).');
      return;
    }

    if (!nome.trim()) {
      setErro('Por favor, informe o nome do produto.');
      return;
    }

    if (!descricao.trim()) {
      setErro('Por favor, informe a descrição do produto.');
      return;
    }

    if (tipoMedida === 'kg' && !pesoKg.trim()) {
      setErro('Por favor, informe o quilo (Kg) do produto.');
      return;
    }

    if (tipoMedida === 'unidade' && !quantidadeUnidade.trim()) {
      setErro('Por favor, informe a unidade do produto.');
      return;
    }

    const produtoEditado = {
      id: id || Date.now(),
      preco: `R$ ${precoNumero.toFixed(2).replace('.', ',')}`,
      produto: nome,
      descricao,
      estoque: tipoMedida === 'unidade' ? `${quantidadeUnidade} unidades` : `${pesoKg} Kg`,
    };

    navigate('/tabela', { state: { produtoEditado } });
  };

  return (
    <div className="principal-container">
      <div className="grid-esquerda">
        <h1 className="editar-produto">Editar Produto</h1>

        <input
          type="text"
          placeholder="Preço:"
          value={preco}
          onChange={e => setPreco(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nome:"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição:"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <select
          value={tipoMedida}
          onChange={e => setTipoMedida(e.target.value)}
        >
          <option value="unidade">Unidade</option>
          <option value="kg">Quilo (kg)</option>
        </select>

        {tipoMedida === 'unidade' && (
          <>
            <label htmlFor="quantidadeUnidade"></label>
            <input
              id="quantidadeUnidade"
              type="number"
              min="0"
              placeholder="Digite a quantidade"
              value={quantidadeUnidade}
              onChange={e => setQuantidadeUnidade(e.target.value)}
            />
          </>
        )}

        {tipoMedida === 'kg' && (
          <>
            <label htmlFor="pesoKg"></label>
            <input
              id="pesoKg"
              type="number"
              step="0.01"
              min="0"
              placeholder="Digite o peso em Kg"
              value={pesoKg}
              onChange={e => setPesoKg(e.target.value)}
            />
          </>
        )}

        {erro && <p className="erro-aviso">{erro}</p>}
        
        <h1 className="salvar" onClick={handleSalvar}>
          Salvar
        </h1>
      </div>

      <div className="grid-direita" />
    </div>
  );
}

export default Edicao;