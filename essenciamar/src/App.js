import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal';
import Login from './pages/Login';
import Tabela from './pages/Tabela';
import Cadastro from './pages/Cadastro';
import Edicao from './pages/Edicao';
import Controle from './pages/Controle';
import Venda from './pages/Venda';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/tabela" element={<Tabela />} />
         <Route path="/cadastro" element={<Cadastro />} />
         <Route path="/edicao" element={<Edicao />} />
         <Route path="/controle" element={<Controle />} />
         <Route path="/venda" element={<Venda />} />
      </Routes>
    </Router>
  );
}

export default App;