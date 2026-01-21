import "./footer.scss";
import Logo from "../assets/logompBlack.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <section className="footer-intro">
          <h3 className="footer-title">
            <img src={Logo} alt="Logo Manon Pontasse" className="footer-logo" />
          </h3>
          <p className="footer-subtitle">Éducatrice spécialisée indépendante</p>
        </section>
        <section className="footer-legal">
          <p>© {year} – Tous droits réservés</p>
          <div className="footer-links">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/confidentialite">Confidentialité</a>
          </div>
        </section>
      </div>
    </footer>
  );
}
