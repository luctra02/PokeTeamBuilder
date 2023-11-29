import { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  // Retrieve search value from sessionStorage or set it to an empty string
  const searchStorage = sessionStorage.getItem('searchValue');
  const searchValue: string = searchStorage ? JSON.parse(searchStorage) : '';

  // State variable for the search term
  const [searchTerm, setSearchTerm] = useState(searchValue);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to clear sessionStorage and reset the search term
  function clearSessionStorage() {
    sessionStorage.clear();
    setSearchTerm('');
  }

  // Event handler for input change in the search bar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Event handler for search on 'Enter' key press
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Save the search term to sessionStorage and navigate to the home page
      sessionStorage.setItem("searchValue", JSON.stringify(searchTerm));
      sessionStorage.removeItem("type"); // Clear the type filter
      navigate('/');
    }
  };

  // JSX structure for the navigation bar
  return (
    <nav className="navbar">
      {/* Logo and link to the home page */}
      <figure className="navbar-logo">
        <Link to="/" onClick={clearSessionStorage}>
          PokemonTeamBuilder
        </Link>
      </figure>

      {/* Search bar */}
      <div className="navbar-item nohover searchbar">
        <input
          className='searchbar'
          type="text"
          placeholder="Search Pokemon Name..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleSearch}
        />
      </div>

      {/* Navigation links */}
      <ul className="navbar-list">
        <Link to="/" onClick={clearSessionStorage}>
          <li className="navbar-item" tabIndex={0}>Home</li>
        </Link>
        <Link to="/team" onClick={clearSessionStorage}>
          <li className="navbar-item" tabIndex={0}>My Team</li>
        </Link>
      </ul>
    </nav>
  );
}


export default Navbar;
