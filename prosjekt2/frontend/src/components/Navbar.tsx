import { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

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
      sessionStorage.setItem("searchValue", JSON.stringify(searchTerm))
      sessionStorage.removeItem("type")
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <figure className="navbar-logo">
        <Link to="/" onClick={clearSessionStorage}>
          PokemonTeamBuilder
        </Link>
      </figure>
      <div className="navbar-item nohover searchbar">
          <input
            type="text"
            placeholder="Search Pokemon Name..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleSearch}
          />
        </div>
      <ul className="navbar-list">
        {/* <a>
        <li className="navbar-item noselect" onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </li>
        </a> */}
        <Link to="/" onClick={clearSessionStorage}>
          <li className="navbar-item">Home</li>
        </Link>
        <Link to="/team" onClick={clearSessionStorage}>
          <li className="navbar-item">My Team</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
