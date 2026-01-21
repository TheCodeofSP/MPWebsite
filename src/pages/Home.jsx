import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../content/ContentProvider.jsx";
import "./home.scss";
import Portrait from "../assets/portraitmp.jpg";

export default function Home() {
  const { t, loading, error } = useContent();

  // options du select
  const options = t("home.profileSelector.options", []);
  const defaultKey = options?.[0]?.key ?? "accompagne";
  const [profile, setProfile] = useState(defaultKey);

  // contenu principal
  const heroTitle = t("home.intro.title", "Accompagnement éducatif spécialisé");
  const heroSubtitle = t("home.intro.subtitle", "");
  const heroLead = t("home.intro.lead", "");

  const highlights = t("home.content.highlights", []);
  const paragraphs = t("home.content.paragraphs", []);

  const ctaPrimary = t("home.cta.primary", {
    label: "Contact",
    href: "/contact",
  });
  const ctaSecondary = t("home.cta.secondary", {
    label: "En savoir plus",
    href: "/approche",
  });

  // intro selon profil
  const introByProfile = t(`home.introsByProfile.${profile}`, null);

  const profileLabel = t("home.profileSelector.label", "Vous êtes :");

  const safeOptions = useMemo(() => {
    return Array.isArray(options) ? options : [];
  }, [options]);

  if (loading) {
    return (
      <main className="home-container">
        <div className="home-content">
          <p>Chargement…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home-container">
        <div className="home-content">
          <p>Erreur : {String(error.message || error)}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="home-container">
      <div className="home-content">
        {/* HERO */}
        <section className="home-intro">
          <div className="home-intro-img">
            <img
              src={Portrait}
              alt="Portrait de Manon Pontasse"
              className="home-intro-portrait"
            />
          </div>
          <div className="home-intro-text">
            <h1>{heroTitle}</h1>
            {heroSubtitle && <p className="home__subtitle">{heroSubtitle}</p>}
            {heroLead && <p className="home__lead">{heroLead}</p>}

            <div className="home-profile">
              <p className="home-profile-label">{profileLabel}</p>

              <div
                className="home-profile-tabs"
                role="tablist"
                aria-label={profileLabel}
              >
                {safeOptions.map((opt) => {
                  const isActive = profile === opt.key;

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={`home-profile-tab ${isActive ? "is-active" : ""}`}
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
                  className="home-profile-panel"
                  role="tabpanel"
                  id={`profile-panel-${profile}`}
                  aria-labelledby={`profile-tab-${profile}`}
                >
                  <h2 className="home-profile-title">{introByProfile.title}</h2>
                  <p className="home-profile-lead">{introByProfile.lead}</p>
                  <p className="home-profile-text">{introByProfile.text}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
