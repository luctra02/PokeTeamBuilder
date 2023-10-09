import "../styles/Navbar.css"
import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/project2/">
                    <p>Pokemon</p>
                </Link>
            </div>

            <ul className="navbar-list">
                <Link to='/'><li className="navbar-item"><a href="/">Home</a></li></Link>
                <div className="navbar-item">
                    <input type="text" placeholder="Search" />
                </div>
            </ul>
            
        </nav>

        )
    }

export default Navbar