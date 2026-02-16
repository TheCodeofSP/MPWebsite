import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { useContent } from "../content/ContentProvider.jsx";
import "./home.scss";
import Portrait from "../assets/portraitmp.jpg";

export default function Home() {
  const { t, loading, error } = useContent();

  // options du sélecteur profil
  const options = t("home.profileSelector.options", []);
  const defaultKey = options?.[0]?.key ?? "accompagne";
  const [profile, setProfile] = useState(defaultKey);

  // hero
  const heroTitle = t("home.intro.title", "Accompagnement éducatif spécialisé");
  const heroSubtitle = t("home.intro.subtitle", "");

  // contenu home
  const highlights = t("home.content.highlights", []);
  const paragraphs = t("home.content.paragraphs", []);

  // CTAs
  const ctaPrimary = t("home.cta.primary", { label: "Contact", href: "/contact" });
  const ctaSecondary = t("home.cta.secondary", { label: "En savoir plus", href: "/process" });

  // intro selon profil
  const introByProfile = t(`home.introsByProfile.${profile}`, null);
  const profileLabel = t("home.profileSelector.label", "Vous êtes :");

  const safeOptions = useMemo(() => (Array.isArray(options) ? options : []), [options]);
  const safeHighlights = useMemo(
    () => (Array.isArray(highlights) ? highlights : []),
    [highlights]
  );
  const safeParagraphs = useMemo(
    () => (Array.isArray(paragraphs) ? paragraphs : []),
    [paragraphs]
  );

  if (loading) {
    return (
      <main className="home">
        <div className="home__content">
          <p>Chargement…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home">
        <div className="home__content">
          <p>Erreur : {String(error.message || error)}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="home__content">
        {/* HERO */}
        <section className="home__intro">
          <div className="home__introImg">
            <img
              src={Portrait}
              alt="Portrait de Manon Pontasse"
              className="home__portrait"
            />
          </div>

          <div className="home__introText">
            <h1 className="home__h1">{heroTitle}</h1>
            {heroSubtitle && <p className="home__subtitle">{heroSubtitle}</p>}


            {/* PROFILS */}
            <div className="home__profile">
              <p className="home__profileLabel">{profileLabel}</p>

              <div className="home__tabs" role="tablist" aria-label={profileLabel}>
                {safeOptions.map((opt) => {
                  const isActive = profile === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={`home__tab ${isActive ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`profile-panel-${opt.key}`}
                      id={`profile-tab-${opt.key}`}
                      onClick={() => setProfile(opt.key)}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {introByProfile && (
                <div
                  className="home__panel"
                  role="tabpanel"
                  id={`profile-panel-${profile}`}
                  aria-labelledby={`profile-tab-${profile}`}
                >
                  <h2 className="home__panelTitle">{introByProfile.title}</h2>
                  <p className="home__panelLead">{introByProfile.lead}</p>
                  <p className="home__panelText">{introByProfile.text}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BLOCS */}
        <section className="home__blocks">
          {/* Highlights -> cartes + icône */}
          <div className="home__card home__card--reveal" style={{ ["--delay"]: "0ms" }}>
            <h2 className="home__h2">Ce que je propose</h2>

            {safeHighlights.length > 0 && (
              <div className="home__highlightsGrid" role="list">
                {safeHighlights.map((h, idx) => (
                  <article
                    key={idx}
                    className="home__highlightCard"
                    role="listitem"
                    style={{ ["--delay"]: `${idx * 70}ms` }}
                  >
                    <div className="home__highlightIcon" aria-hidden="true">
                      <FiCheckCircle />
                    </div>
                    <p className="home__highlightText">{h}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Paragraphs + CTA -> animé */}
          <div className="home__card home__card--accent home__card--reveal" style={{ ["--delay"]: "90ms" }}>
            <h2 className="home__h2">{ctaSecondary?.label ?? "Découvrir l’approche"}</h2>

            {safeParagraphs.length > 0 && (
              <div className="home__paragraphs">
                {safeParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            <div className="home__ctaRow home__ctaRow--bottom">
              {ctaSecondary?.href && (
                <Link className="home__btn home__btn--ghost" to={ctaSecondary.href}>
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
