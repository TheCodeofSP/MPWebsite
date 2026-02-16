import { Link } from "react-router-dom";
import { useContent } from "../content/ContentProvider.jsx";
import "./process.scss";

import {
  FiHeart,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiSmile,
  FiShield,
  FiCompass,
  FiMessageCircle,
} from "react-icons/fi";

export default function Process() {
  const { t, loading, error } = useContent();

  const intro = t("approach.intro", {});
  const steps = t("approach.content.steps", []);
  const principles = t("approach.content.principles", []);

  if (loading) {
    return (
      <main className="process">
        <div className="process__container">
          <p>Chargement…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="process">
        <div className="process__container">
          <p>Erreur : {String(error.message || error)}</p>
        </div>
      </main>
    );
  }

  const safeSteps = Array.isArray(steps) ? steps : [];
  const safePrinciples = Array.isArray(principles) ? principles : [];

  // Un set d'icônes "soft" (on boucle si + d'items)
  const principleIcons = [
    FiHeart,
    FiUsers,
    FiTarget,
    FiTrendingUp,
    FiSmile,
    FiShield,
    FiCompass,
    FiMessageCircle,
  ];

  return (
    <main className="process">
      <div className="process__container">
        {/* HERO */}
        <header className="process__hero">
          <h1 className="process__title">{intro?.title ?? "Mon approche"}</h1>
          {intro?.subtitle && (
            <p className="process__kicker">{intro.subtitle}</p>
          )}
          {intro?.lead && <p className="process__lead">{intro.lead}</p>}
        </header>

        {/* TIMELINE */}
        <section className="process__section">
          <h2 className="process__h2">Étapes</h2>

          <div className="timeline" aria-label="Étapes de l’accompagnement">
            <div className="timeline__line" aria-hidden="true" />

            {safeSteps.map((s, idx) => {
              const isRight = idx % 2 === 1;
              const num = String(idx + 1).padStart(2, "0");

              return (
                <article
                  key={idx}
                  className={`timeline__item ${isRight ? "is-right" : "is-left"}`}
                  style={{ ["--delay"]: `${idx * 90}ms` }} // stagger léger
                >
                  <div className="timeline__dot" aria-hidden="true">
                    {num}
                  </div>

                  <div className="timeline__card">
                    <h3 className="process__h3">{s.title}</h3>
                    <p className="process__p process__p--muted">{s.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* PRINCIPES */}
        <section className="process__section">
          <h2 className="process__h2">Principes</h2>

          <div className="principles" role="list">
            {safePrinciples.map((text, idx) => {
              const Icon = principleIcons[idx % principleIcons.length];
              return (
                <article
                  key={idx}
                  className="principleCard"
                  role="listitem"
                  style={{ ["--delay"]: `${idx * 70}ms` }}
                >
                  <div className="principleCard__icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <p className="principleCard__text">{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA bas de page */}
        <section className="process__footerCta">
          <div className="process__footerCard">
            <h2 className="process__h2">On en parle ?</h2>
            <p className="process__p">
              Décrivez votre situation et vos objectifs : je vous réponds dès
              que possible.
            </p>
            <Link className="process__btn process__btn--primary" to="/contact">
              Prendre contact
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
