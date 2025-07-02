const Image2 = styled(Image)`
  width: 27%;
  top: 33%;
  right: 78%;
`;
const Image3 = styled(Image)`
  width: 20%;
  bottom: 52%;
  left: 84%;
  transform: rotate(180deg) rotate(5deg);
`;
const Home = () => {
  return (
    <Container>
      <Title>
        <Link href="login.html">Entrar</Link>
      </Title>
      <Card>
        <p>
          Este projeto de desenvolvimento web é inspirado na loja Essência do Mar, especializada em produtos naturais e localizada em Pontal do Sul (PR).
          A proposta inclui a criação de um site intuitivo e de fácil manuseio, pensado especialmente para que a dona da loja possa gerenciar os produtos, atualizar informações e ter controle total da loja online de forma prática e autônoma.
          Nosso objetivo é unir tecnologia e simplicidade, criando uma ferramenta útil para o dia a dia da loja e valorizando o comércio local.
        </p>
      </Card>
      <Image src={logo} alt="Descrição da imagem" />
      <Image2 src={orlga} alt="Descrição da imagem" />
      <Image3 src={orlga} alt="Descrição da imagem" />
    </Container>
  );
};
export default Home;