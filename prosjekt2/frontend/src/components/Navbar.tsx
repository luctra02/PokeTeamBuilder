import { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--background', 'url(https://w.wallhaven.cc/full/4l/wallhaven-4lmey2.png)');

  }, []);

  useEffect(() => {
      const root = document.documentElement;
      if (mode === 'light') {
        root.style.setProperty('--background', 'url(https://w.wallhaven.cc/full/4l/wallhaven-4lmey2.png)');
        return;
      } else {
        root.style.setProperty('--background', 'url(https://w.wallhaven.cc/full/49/wallhaven-4963zx.jpg)');
        return;
      }
  }, [mode]);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/searchDisplay', { state: { searchTerm: searchTerm } });
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
        <li className="navbar-item" onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </li>
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
