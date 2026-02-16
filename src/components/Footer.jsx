import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./footer.scss";
import Logo from "../assets/logo4.png";
import { FiMail, FiPhone, FiArrowUp } from "react-icons/fi";
import { useContent } from "../content/ContentProvider.jsx";

function normalizePhone(value) {
  return String(value || "").replace(/\s/g, "");
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useContent();

  const methods = t("contact.content.methods", []);
  const email = Array.isArray(methods)
    ? methods.find((m) => m.type === "email")
    : null;
  const phone = Array.isArray(methods)
    ? methods.find((m) => m.type === "phone")
    : null;

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Ligne de séparation */}
      <div className="footer-separator" aria-hidden="true" />

      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          {/* Branding */}
          <section
            className="footer__brand footer__reveal"
            style={{ ["--delay"]: "0ms" }}
          >
            <img
              src={Logo}
              alt="Logo Manon Pontasse"
              className="footer__logo"
            />
            <p className="footer__tagline">
              Éducatrice spécialisée indépendante
            </p>
          </section>

          {/* Contact rapide */}
          <section
            className="footer__contact footer__reveal"
            style={{ ["--delay"]: "80ms" }}
          >
            {" "}
            <h3 className="footer__title">Contact</h3>
            <div className="footer__contactList">
              {email?.value && (
                <a
                  className="footer__contactLink"
                  href={`mailto:${email.value}`}
                >
                  <FiMail />
                  <span>{email.value}</span>
                </a>
              )}

              {phone?.value && (
                <a
                  className="footer__contactLink"
                  href={`tel:${normalizePhone(phone.value)}`}
                >
                  <FiPhone />
                  <span>{phone.value}</span>
                </a>
              )}
            </div>
          </section>

          {/* Légal */}
          <section
            className="footer__legal footer__reveal"
            style={{ ["--delay"]: "160ms" }}
          >
            {" "}
            <h3 className="footer__title">Informations</h3>
            <div className="footer__links">
              <Link to="/mentions-legales">Mentions légales</Link>
              <Link to="/confidentialite">Confidentialité</Link>
            </div>
            <p className="footer__copy">© {year} – Tous droits réservés</p>
          </section>
        </div>

        {/* Scroll to top */}
        <button
          className={`footer__scrollTop ${showTop ? "is-visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          <FiArrowUp />
        </button>
      </footer>
    </>
  );
}
