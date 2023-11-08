import { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { searchPokemons } from '../utils/filterSortingPokemons';

function Navbar() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--background', 'url(https://w.wallhaven.cc/full/4l/wallhaven-4lmey2.png)');
    root.style.setProperty('--text-color', 'black');
  }, []);

  useEffect(() => {
      const root = document.documentElement;
      if (mode === 'light') {
        root.style.setProperty('--background', 'url(https://w.wallhaven.cc/full/4l/wallhaven-4lmey2.png)');
        root.style.setProperty('--text-color', 'black');
      } else {
        root.style.setProperty('--background', 'url(https://w.wallhaven.cc/full/49/wallhaven-4963zx.jpg)');
        root.style.setProperty('--text-color', 'white');
      }
  }, [mode]);

  const searchStorage = sessionStorage.getItem('searchValue')
  const searchValue: string = searchStorage ? JSON.parse(searchStorage) : '';

  const [searchTerm, setSearchTerm] = useState(searchValue);
  const navigate = useNavigate();

  function clearSessionStorage(){
    sessionStorage.removeItem('FilteredPokemons')
    sessionStorage.removeItem('FilteredTypes')
    sessionStorage.removeItem('SearchedPokemons')
    sessionStorage.removeItem('type')
    sessionStorage.removeItem('attribute')
    sessionStorage.removeItem('searchValue')
    setSearchTerm('')
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sessionStorage.removeItem('FilteredPokemons')
      searchPokemons(searchTerm);
      sessionStorage.setItem("searchValue", JSON.stringify(searchTerm))
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={clearSessionStorage}>
          <p>Pokemon</p>
        </Link>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item" onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </li>
        <Link to="/" onClick={clearSessionStorage}>
          <li className="navbar-item">Home</li>
        </Link>
        <Link to="/team" onClick={clearSessionStorage}>
          <li className="navbar-item">My Team</li>
        </Link>
        <div className="navbar-item">
          <input
            type="text"
            placeholder="Search Pokemon Name"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleSearch}
          />
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
