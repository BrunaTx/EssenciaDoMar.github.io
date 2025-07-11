import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logoBackground from './logo.jpg'; 


const PrincipalContainer = styled.div`
  font-family: 'American Typewriter', serif;
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const GridEsquerda = styled.div`
  background-color: #9ab991;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-top: 140px;
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

const EditarProdutoTitle = styled.h1`
  position: absolute;
  top: 20px;
  left: 84px;
  font-size: 80px;
  color: #2a5554;
  font-weight: bold;
  font-family: 'American Typewriter', serif;
`;

const SalvarButton = styled.h1`
  position: absolute;
  bottom: 20px;
  left: 16%;
  font-size: 80px;
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
  margin-top: 2px;
  margin-bottom: 15px;
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
  margin: 2px 0 7px 0;
  font-family: 'American Typewriter', serif;

  &::placeholder {
    color: #2a5554;
    font-weight: normal;
  }
`;

const SelectEstilizado = styled.select`
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
  margin: 2px 0 7px 0;
  font-family: 'American Typewriter', serif;
`;

const LabelEstilizado = styled.label`
  display: block;
  color: #2a5554;
  font-family: 'American Typewriter', serif;
  font-weight: normal;
`;

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
    <PrincipalContainer>
      <GridEsquerda>
        <EditarProdutoTitle>Editar Produto</EditarProdutoTitle>

        <InputEstilizado
          type="text"
          placeholder="Preço:"
          value={preco}
          onChange={e => setPreco(e.target.value)}
        />

        <InputEstilizado
          type="text"
          placeholder="Nome:"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <InputEstilizado
          type="text"
          placeholder="Descrição:"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <SelectEstilizado
          value={tipoMedida}
          onChange={e => setTipoMedida(e.target.value)}
        >
          <option value="unidade">Unidade</option>
          <option value="kg">Quilo (kg)</option>
        </SelectEstilizado>

        {tipoMedida === 'unidade' && (
          <>
            <LabelEstilizado htmlFor="quantidadeUnidade"></LabelEstilizado>
            <InputEstilizado
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
            <LabelEstilizado htmlFor="pesoKg"></LabelEstilizado>
            <InputEstilizado
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

        {erro && <ErroAviso>{erro}</ErroAviso>}
        
        <SalvarButton onClick={handleSalvar}>
          Salvar
        </SalvarButton>
      </GridEsquerda>

      <GridDireita />
    </PrincipalContainer>
  );
}

export default Edicao;