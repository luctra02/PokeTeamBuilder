import DetailedPokemonPage from './pages/DetailedPokemonPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplaySearchPage from './pages/DisplaySearchPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemonInfo/:id" element={<DetailedPokemonPage />} />
          <Route path="/searchDisplay" element={<DisplaySearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
 