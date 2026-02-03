import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Logo from "../assets/logompBlack.svg";
import Logo1 from "../assets/logo1.png";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";
import Logo4 from "../assets/logo4.png";

import "./header.scss";

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={Logo1} alt="Logo de Manon Pontasse" />
        </Link>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
