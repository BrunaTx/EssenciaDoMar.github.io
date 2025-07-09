import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal';
import Login from './pages/Login';
import Tabela from './pages/Tabela';
import Cadastro from './pages/Cadastro';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/principal" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tabela" element={<Tabela />} />
         <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;