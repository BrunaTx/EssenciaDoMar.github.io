// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Tabela from './pages/Tabela'; // Importe diretamente do local onde está seu componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/tabela" element={<Tabela />} />
      </Routes>
    </Router>
  );
}

export default App;