import { useContent } from "../content/ContentProvider.jsx";
import "./privacy.scss";

export default function Privacy() {
  const { t, loading, error } = useContent();

  if (loading)
    return (
      <main className="privacy-container">
        <p>Chargement…</p>
      </main>
    );
  if (error)
    return (
      <main className="privacy-container">
        <p>Erreur: {String(error.message || error)}</p>
      </main>
    );

  const base = "legalPages.privacy";
  const collected = t(`${base}.dataCollected.items`, []);
  const rights = t(`${base}.rights.items`, []);

  return (
    <main className="privacy-container">
      <section className="privacy-content">
        <div>
          <h1>{t(`${base}.title`)}</h1>
          <p>{t(`${base}.intro`)}</p>
        </div>
        <div>
          <h2>{t(`${base}.dataCollected.title`)}</h2>
          <p>{t(`${base}.dataCollected.lead`)}</p>
          <ul>
            {collected.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t(`${base}.use.title`)}</h2>
          <p>{t(`${base}.use.text`)}</p>
        </div>
        <div>
          <h2>{t(`${base}.retention.title`)}</h2>
          <p>{t(`${base}.retention.text`)}</p>
        </div>
        <div>
          <h2>{t(`${base}.sharing.title`)}</h2>
          <p>{t(`${base}.sharing.text`)}</p>
        </div>
        <div>
          <h2>{t(`${base}.rights.title`)}</h2>
          <p>{t(`${base}.rights.lead`)}</p>
          <ul>
            {rights.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
        <p>
          {t(`${base}.contact.text`)}{" "}
          <strong>{t(`${base}.contact.email`)}</strong>
        </p>
      </section>
    </main>
  );
}
