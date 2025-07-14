import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.jpg';
import orlga from './orlga.jpg';

const StyledDiv = styled.div`
  position: relative;
  height: 100vh; 
  font-family: American Typewriter, serif;
  background-color: #9ab991 !important;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;


const StyledImg = styled.img`
  width: 14%;
  border-radius: 100%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledImg2 = styled.img`
  position: absolute;
  width: 27%;
  border-radius: 100%;
  top: 30%;
  right: 77%;
  opacity: 0.3;
  z-index: 0;
`;

const StyledImg3 = styled.img`
  position: absolute;
  width: 20%;
  border-radius: 100%;
  bottom: 52%;
  left: 81%;
  opacity: 0.3;
  z-index: 0;
  transform: rotate(180deg) rotate(5deg);
`;

const StyledConteudo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  z-index: 1;
`;

const StyledLink = styled.button`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  color: #2a5554;
  font-size: 80px;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: #d6e4da;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 23%;
`;

const StyledInputBox = styled.div`
  background-color: #d6e4da;
  border-radius: 15px;
  padding: 20px 30px;
  width: 320px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-size: 18px;
  text-align: center;
`;

const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 20px;
  color: #2a5554;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #aaa;
  box-sizing: border-box;
`;

const StyledErro = styled.div`
  color: #2a5554;
  text-align: center;
  font-size: 20px;
  font-family: American Typewriter, serif;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === 'brulyz14@gmail.com' && password === 'brulyz30') {
      navigate('/tabela');
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <StyledDiv>
      <StyledImg src={logo} className="img" alt="Logo Essência do Mar" />
      <StyledImg2 src={orlga} className="img2" alt="Decoração" />
      <StyledImg3 src={orlga} className="img3" alt="Decoração" />
      
      <StyledConteudo className="conteudo">
        <StyledInputContainer className="input-container">
          <StyledInputBox className="input-box">
            <StyledLabel htmlFor="email">E-mail</StyledLabel>
            <StyledInput 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </StyledInputBox>
          <StyledInputBox className="input-box">
            <StyledLabel htmlFor="password">Senha</StyledLabel>
            <StyledInput 
              type="password" 
              id="password" 
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledInputBox>
        </StyledInputContainer>

        {error && <StyledErro className="erro-messagem">{error}</StyledErro>}

        <StyledLink onClick={handleLogin} className="login-button">Entrar</StyledLink>
      </StyledConteudo>
    </StyledDiv>
  );
};

export default Login;