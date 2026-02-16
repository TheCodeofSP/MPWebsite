import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./navbar.scss";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false); // dropdown desktop
  const location = useLocation();

  const close = () => {
    setOpen(false);
    setInfoOpen(false);
  };

  // Sous-catégories (hash)
  const infoItems = useMemo(
    () => [
      {
        label: "Déficience intellectuelle",
        to: "/informations#deficience-intellectuelle",
      },
      { label: "Troubles associés", to: "/informations#troubles-associes" },
      { label: "FAQ", to: "/informations#faq" },
    ],
    [],
  );

  // Ferme menus quand on change de route
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // Fermer avec Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
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
        <Link to="/" onClick={close} className="navbar__link">
          Accueil
        </Link>

        {/* Desktop: dropdown / Mobile: bloc avec sous-liens */}
        <div className={`navbar__dropdown ${infoOpen ? "is-open" : ""}`}>
          <button
            type="button"
            className={`navbar__dropbtn ${location.pathname === "/informations" ? "is-active" : ""}`}
            aria-haspopup="menu"
            aria-expanded={infoOpen}
            onClick={() => setInfoOpen((v) => !v)}
          >
            Informations{" "}
            <span className="navbar__chev" aria-hidden="true">
              ▾
            </span>
          </button>

          <div className="navbar__menu" role="menu" aria-label="Informations">
            <NavLink
              to="/informations"
              onClick={close}
              className="navbar__menuItem"
              role="menuitem"
            >
              Vue d’ensemble
            </NavLink>

            {infoItems.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={close}
                className="navbar__menuItem"
                role="menuitem"
              >
                {it.label}
              </Link>
            ))}
          </div>

          {/* Mobile: sous-liens affichés dans la pile quand burger ouvert */}
          <div className="navbar__mobileSub">
            {infoItems.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={close}
                className="navbar__sublink"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>

        <NavLink to="/process" onClick={close} className="navbar__link">
          Mon approche
        </NavLink>
        <NavLink to="/about" onClick={close} className="navbar__link">
          Me connaître
        </NavLink>
        <NavLink to="/contact" onClick={close} className="navbar__link">
          Contact
        </NavLink>
      </div>

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
