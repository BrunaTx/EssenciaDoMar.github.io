import './login.css';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';
import orlga from './orlga.jpg';

const Login = () => {
  return (
    <div>
      {/* Imagens adicionadas exatamente como especificado no CSS */}
      <img src={logo} className="img" alt="Logo Essência do Mar" />
      <img src={orlga} className="img2" alt="Decoração" />
      <img src={orlga} className="img3" alt="Decoração" />
      
      <div className="conteudo">
        <h1>Bem-vindo</h1>
        <div className="input-container">
          <div className="input-box">
            <label htmlFor="username">Usuário</label>
            <input type="text" id="username" placeholder="Digite seu usuário" />
          </div>
          <div className="input-box">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" />
          </div>
        </div>
        <Link to="/principal" className="link">Entrar</Link>
      </div>
    </div>
  );
};

export default Login;