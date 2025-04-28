import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Home from './screens/home';
import PokemonDetail from './screens/pokemon';
import PokemonAdmin from './screens/admin/PokemonAdmin';
import PokemonForm from './components/PokemonForm/PokemonForm';
import Header from './components/Header/Header';
import Login from './screens/Login';
import Register from './screens/Register';
import './App.css';

const EditPokemonRoute = () => {
  const { id } = useParams();
  return <PokemonForm pokemonId={id} />;
};

function CreatePokemonRoute() {
  return (
    <>
      <Header showBottom={false} />
      <PokemonForm />
    </>
  );
}

function isAuthenticated() {
  // Un token ou le mode invité (stocké dans localStorage)
  return !!localStorage.getItem('token') || localStorage.getItem('guest') === '1';
}

function isGuest() {
  return localStorage.getItem('guest') === '1';
}

function PrivateRoute({ children }) {
  if (!isAuthenticated() || isGuest()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/pokemon/:id" element={isAuthenticated() ? <PokemonDetail /> : <Navigate to="/login" replace />} />
        <Route path="/admin/pokemon" element={<PrivateRoute><PokemonAdmin /></PrivateRoute>} />
        <Route path="/admin/pokemon/new" element={<PrivateRoute><CreatePokemonRoute /></PrivateRoute>} />
        <Route path="/admin/pokemon/:id/edit" element={<PrivateRoute><EditPokemonRoute /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
