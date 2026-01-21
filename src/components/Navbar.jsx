import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.scss";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Ferme le menu quand on change de route (clic sur un lien)
  const close = () => setOpen(false);

  // Bonus: fermer avec Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="navbar">
      <button
        className={`navbar__burger ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar__links ${open ? "is-open" : ""}`}>
        <Link to="/" onClick={close}>
          Accueil
        </Link>
        <NavLink to="/process" onClick={close}>
          Approche
        </NavLink>
        <NavLink to="/information" onClick={close}>
          Informations
        </NavLink>
        <NavLink to="/about" onClick={close}>
          Me connaitre
        </NavLink>
        <NavLink to="/contact" onClick={close}>
          Contact
        </NavLink>
      </div>

      {/* Overlay pour fermer en cliquant en dehors */}
      {open && (
        <button
          className="navbar__overlay"
          onClick={close}
          aria-label="Fermer le menu"
        />
      )}
    </nav>
  );
}
