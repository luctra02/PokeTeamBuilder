import { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { searchPokemons } from '../utils/filterSortingPokemons';

function Navbar() {
  const searchStorage = sessionStorage.getItem('searchValue')
  const searchValue: string = searchStorage ? JSON.parse(searchStorage) : '';

  const [searchTerm, setSearchTerm] = useState(searchValue);
  const navigate = useNavigate();

  function clearSessionStorage(){
    sessionStorage.clear()
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
        <Link to="/login">
          <li className="navbar-item">Login</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
