import { Link } from 'react-router-dom';
import './principal.css';
import logo from './logo.jpg';
import orlga from './orlga.jpg';

function Principal() {
  return (
    <div className="principal-container">
      <h1 className="principal-title">
        <Link to="/login" className="principal-link">Entrar</Link> {/* Link para a página de login */}
      </h1>
        <div className="principal-card">
        <p>Este projeto de Desenvolvimento Web é inspirado na loja Essência do Mar, especializada em produtos naturais e localizada 
          em Pontal do Sul (PR). A proposta inclui a criação de um site intuitivo e de fácil manuseio,pensado especialmente para que 
          a dona da loja possa gerenciar os produtos, atualizar informações e ter controle total da loja online de forma prática e 
          autônoma. Nosso objetivo é unir tecnologia e simplicidade, criando uma ferramenta útil para o dia a dia da loja e valorizando
          o comércio local. Para acompanhar as novidades e o progresso do projeto, siga nossa página no Instagram: <Link to="https://www.instagram.com/essenciadomar__/" className="principal-lin"> Essência do Mar</Link> </p>
      </div>
      <div className="principal-images">
        <img src={logo} alt="Logo Essência do Mar" className="principal-logo" />
        <img src={orlga} alt="Decoração" className="principal-orlga1" />
        <img src={orlga} alt="Decoração" className="principal-orlga2" />
      </div>
    </div>
  );
}

export default Principal;