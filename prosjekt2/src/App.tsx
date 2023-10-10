import DetailedPokemonPage from './pages/DetailedPokemonPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      </div>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemonInfo/:id" element={<DetailedPokemonPage />} />
        </Routes>
    </Router>
  );
}

export default App;
 