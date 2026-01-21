import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Logo from "../assets/logompBlack.svg";
import "./header.scss";

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={Logo} alt="Logo de Manon Pontasse" />
        </Link>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
