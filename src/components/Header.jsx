import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Logo3 from "../assets/logo3.png";
import LogoInitiales from "../assets/logoInitiales.png";


import "./header.scss";

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={Logo3} alt="Logo de Manon Pontasse" />
        </Link>

        {/* Navigation */}
        <Navbar />
      </div>
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={LogoInitiales} alt="Logo de Manon Pontasse" />
        </Link>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
