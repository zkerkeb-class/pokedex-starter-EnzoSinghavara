import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './screens/home';
import PokemonDetail from './screens/pokemon';
import PokemonAdmin from './screens/admin/PokemonAdmin';
import PokemonForm from './components/PokemonForm/PokemonForm';
import Header from './components/Header/Header';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/admin/pokemon" element={<PokemonAdmin />} />
        <Route path="/admin/pokemon/new" element={<CreatePokemonRoute />} />
        <Route path="/admin/pokemon/:id/edit" element={<EditPokemonRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
