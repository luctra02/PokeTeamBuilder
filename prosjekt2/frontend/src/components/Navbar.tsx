import { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/', { state: { searchTerm: searchTerm } });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <p>Pokemon</p>
        </Link>
      </div>

      <ul className="navbar-list">
        <Link to="/">
          <li className="navbar-item">Home</li>
        </Link>
        <Link to="/team">
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
