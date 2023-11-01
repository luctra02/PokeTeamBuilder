import DetailedPokemonPage from './pages/DetailedPokemonPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayTeamPage from './pages/DisplayTeamPage';

function App() {
  return (
    <Router basename="/project2">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemonInfo/:id" element={<DetailedPokemonPage />} />
          <Route path="/team" element={<DisplayTeamPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
