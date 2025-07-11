import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.jpg';
import orlga from './orlga.jpg';

const PrincipalContainer = styled.div`
  font-family: 'American Typewriter', serif;
  background-color: #9ab991;
  height: 100vh;
  position: relative; 
  overflow: hidden;
`;

const PrincipalTitle = styled.h1`
  color: #2a5554;
  font-size: 80px;
  position: absolute;
  top: 5%; 
  left: 50%;
  transform: translateX(-50%); 
  z-index: 2;
`;

const PrincipalLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #d6e4da;
  }
`;

const PrincipalLin = styled(Link)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;

const PrincipalCard = styled.div`
  color: #2a5554;
  width: 75%;
  max-width: 800px;
  background-color: #d6e4da;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-size: 30px;
  position: absolute;
  top: 20%; 
  left: 50%;
  transform: translateX(-50%); 
  z-index: 1;
  text-align: justify;
`;

const PrincipalLogo = styled.img.attrs({ src: logo, alt: "Logo Essência do Mar" })`
  width: 35%;
  border-radius: 100%;
  position: absolute;
  top: 46%; 
  left: 69%; 
  opacity: 0.3;
  z-index: 0;
`;

const PrincipalOrlga1 = styled.img.attrs({ src: orlga, alt: "Decoração" })`
  width: 27%;
  border-radius: 100%;
  position: absolute;
  top: 33%;
  right: 78%;
  opacity: 0.3;
  z-index: 0;
`;

const PrincipalOrlga2 = styled.img.attrs({ src: orlga, alt: "Decoração" })`
  width: 20%;
  border-radius: 100%;
  position: absolute;
  bottom: 52%; 
  left: 84%; 
  opacity: 0.3;
  z-index: 0;
  transform: rotate(180deg) rotate(5deg);
`;


function Principal() {
  return (
    <PrincipalContainer>
      <PrincipalTitle>
        <PrincipalLink to="/login">Entrar</PrincipalLink>
      </PrincipalTitle>
      
      <PrincipalCard>
        <p>Este projeto de Desenvolvimento Web é inspirado na loja Essência do Mar, especializada em produtos naturais e localizada 
          em Pontal do Sul (PR). A proposta inclui a criação de um site intuitivo e de fácil manuseio,pensado especialmente para que 
          a dona da loja possa gerenciar os produtos, atualizar informações e ter controle total da loja online de forma prática e 
          autônoma. Nosso objetivo é unir tecnologia e simplicidade, criando uma ferramenta útil para o dia a dia da loja e valorizando
          o comércio local. Para acompanhar as novidades e o progresso do projeto, siga nossa página no Instagram: <PrincipalLin to="https://www.instagram.com/essenciadomar__/"> Essência do Mar</PrincipalLin> </p>
      </PrincipalCard>
      
      <PrincipalLogo />
      <PrincipalOrlga1 />
      <PrincipalOrlga2 />
    </PrincipalContainer>
  );
}

export default Principal;