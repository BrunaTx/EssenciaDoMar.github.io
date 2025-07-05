import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Principal from './pages/Principal';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/principal" element={<Principal />} />
      <Route path="/" element={<Principal />} />
    </Routes>
  );
}

export default App;