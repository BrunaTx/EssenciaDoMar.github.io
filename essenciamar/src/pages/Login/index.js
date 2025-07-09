import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logo.jpg';
import orlga from './orlga.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email === 'brulyz14@gmail.com' && password === 'brulyz30') {

      navigate('/tabela');
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div>
      {}
      <img src={logo} className="img" alt="Logo Essência do Mar" />
      <img src={orlga} className="img2" alt="Decoração" />
      <img src={orlga} className="img3" alt="Decoração" />
      
      <div className="conteudo">
        <div className="input-container">
          <div className="input-box">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="erro-messagem">{error}</div>}

<button onClick={handleLogin} className="login-button">Entrar</button>
      </div>
    </div>
  );
};

export default Login;