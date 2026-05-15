import { Link } from "react-router-dom";
import "../css/Navbar.css"
import SplitText from "./reactbits/SplitText";

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">
                <SplitText text="ADKD MOVIE SEARCH" className="brand-text" delay={0.08} />
            </Link>
        </div>

        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
    </nav>
}

export default NavBar;