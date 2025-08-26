import React, { useState } from 'react';
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
`;

const GridEsquerda = styled.div`
  background-color: #9ab991;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-top: 180px !important;
`;

const GridDireita = styled.div`
  background-image: url(${logoBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  margin: 0;
`;

const NovoProduto = styled.h1`
  position: absolute;
  top: 20px;
  left: 115px;
  font-size: 80px;
  color: #2a5554;
  font-weight: bold;
  font-family: 'American Typewriter', serif;
`;

const Cadastrar = styled.h1`
  position: absolute;
  bottom: 40px;
  left: 12%;
  font-size: 80px;
  color: #2a5554;
  font-weight: bold;
  font-family: 'American Typewriter', serif;
  cursor: pointer;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const Label = styled.label`
  display: block;
  color: #2a5554;
  font-family: 'American Typewriter', serif;
  font-weight: normal;
`;

const ErroAviso = styled.p`
  color:  #2a5554;
`;

function Cadastro() {
  const navigate = useNavigate();

  const [preco, setPreco] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoMedida, setTipoMedida] = useState('unidade');
  const [quantidadeUnidade, setQuantidadeUnidade] = useState('');
  const [pesoKg, setPesoKg] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastrar = async () => {
    const precoFormatado = preco.trim().replace(',', '.');
    const precoNumero = parseFloat(precoFormatado);
  
    if (
      !preco.trim() ||
      !nome.trim() ||
      !descricao.trim() ||
      (tipoMedida === 'unidade' && !quantidadeUnidade.trim()) ||
      (tipoMedida === 'kg' && !pesoKg.trim())
    ) {
      setErro('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    if (isNaN(precoNumero)) {
      setErro('Por favor, informe um preço válido (somente números).');
      return;
    }
  
    const novoProduto = {
      preco: precoFormatado,
      produto: nome,
      descricao,
      tipoMedida,
      quantidadeUnidade,
      pesoKg,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        setErro(message || 'Erro ao cadastrar produto.');
        return;
      }
  
      const produtoCriado = await response.json();
  
      
      setPreco('');
      setNome('');
      setDescricao('');
      setQuantidadeUnidade('');
      setPesoKg('');
      setErro('');
  
    
      navigate('/tabela', { state: { novoProduto: produtoCriado } });
  
    } catch (error) {
      console.error(error);
      setErro('Erro ao cadastrar produto.');
    }
  };
  
  

  return (
    <PrincipalContainer>
      <GridEsquerda>
        <NovoProduto>Novo Produto</NovoProduto>
        <Input
          type="text"
          placeholder="Preço:"
          value={preco}
          onChange={e => setPreco(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Nome:"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Descrição:"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <Select
          value={tipoMedida}
          onChange={e => setTipoMedida(e.target.value)}
        >
          <option value="unidade">Unidade</option>
          <option value="kg">Quilo (kg)</option>
        </Select>

        {tipoMedida === 'unidade' && (
          <>
            <Label htmlFor="quantidadeUnidade"></Label>
            <Input
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
            <Label htmlFor="pesoKg"></Label>
            <Input
              id="pesoKg"
              type="number"
              step="0.001"
              min="0"
              placeholder="Digite o peso em Kg"
              value={pesoKg}
              onChange={e => setPesoKg(e.target.value)}
            />
          </>
        )}
        {erro && <ErroAviso>{erro}</ErroAviso>}
        <Cadastrar onClick={handleCadastrar}>
          Cadastrar
        </Cadastrar>
      </GridEsquerda>

      <GridDireita />
    </PrincipalContainer>
  );
}

export default Cadastro;