import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useContent } from "../content/ContentProvider.jsx";
import "./informations.scss";

function scrollToHash(hash) {
  if (!hash) return;
  const id = hash.replace("#", "");
  // petit timeout pour laisser le DOM rendre
  window.requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export default function Informations() {
  const { t, loading, error } = useContent();
  const location = useLocation();

  const intro = t("informations.intro", {});
  const deficiency = t("informations.deficiency", {});
  const associated = t("informations.associatedDisorders", {});
  const faq = t("informations.faq", {});

  // Table des matières (future source pour la navbar dropdown)
  const toc = useMemo(
    () => [
      {
        id: "deficience-intellectuelle",
        label: deficiency?.title ?? "Déficience intellectuelle",
      },
      {
        id: "troubles-associes",
        label: associated?.title ?? "Troubles associés",
      },
      { id: "faq", label: faq?.title ?? "FAQ" },
    ],
    [deficiency?.title, associated?.title, faq?.title],
  );

  useEffect(() => {
    scrollToHash(location.hash);
  }, [location.hash]);

  if (loading) {
    return (
      <main className="info">
        <div className="info__container">
          <p>Chargement…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="info">
        <div className="info__container">
          <p>Erreur : {String(error.message || error)}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="info">
      <div className="info__container">
        {/* Intro */}
        <header className="info__hero">
          <h1 className="info__title">{intro?.title}</h1>
          <p className="info__kicker">{intro?.subtitle}</p>
          {intro?.lead && <p className="info__lead">{intro.lead}</p>}
        </header>

        <div className="info__layout">
          {/* TOC (sticky) */}
          <aside className="info__toc" aria-label="Sommaire">
            <div className="info__tocCard">
              <p className="info__tocTitle">Accès rapide</p>
              <nav>
                <ul className="info__tocList">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a className="info__tocLink" href={`#${item.id}`}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Contenu */}
          <div className="info__content">
            {/* Section 1 */}
            <section id="deficience-intellectuelle" className="info__section">
              <h2 className="info__h2">{deficiency?.title}</h2>
              <div className="info__card">
                {(deficiency?.paragraphs ?? []).map((p, idx) => (
                  <p key={idx} className="info__p">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section id="troubles-associes" className="info__section">
              <h2 className="info__h2">{associated?.title}</h2>
              {associated?.intro && (
                <p className="info__p">{associated.intro}</p>
              )}

              <div className="info__grid">
                {(associated?.items ?? []).map((it, idx) => (
                  <article key={idx} className="info__miniCard">
                    <h3 className="info__h3">{it.title}</h3>
                    <p className="info__p info__p--muted">{it.text}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="faq" className="info__section">
              <h2 className="info__h2">{faq?.title}</h2>
              {faq?.lead && <p className="info__p">{faq.lead}</p>}

              <div className="info__stack">
                {(faq?.items ?? []).map((it, idx) => (
                  <details key={idx} className="info__faq">
                    <summary className="info__faqQ">{it.q}</summary>
                    <div className="info__faqA">
                      <p className="info__p">{it.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
