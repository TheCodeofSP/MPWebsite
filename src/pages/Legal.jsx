import { useContent } from "../content/ContentProvider.jsx";
import "./legal.scss";

export default function Legal() {
  const { t, loading, error } = useContent();

  if (loading)
    return (
      <main className="legal-container">
        <p>Chargement…</p>
      </main>
    );
  if (error)
    return (
      <main className="legal-container">
        <p>Erreur: {String(error.message || error)}</p>
      </main>
    );

  const base = "legalPages.legal";

  return (
    <main className="legal-container">
      <div className="legal-content">
        <div>
          <h1>{t(`${base}.title`)}</h1>
          <p>{t(`${base}.intro`)}</p>
        </div>

        <div>
          <h2>{t(`${base}.publisher.title`)}</h2>
          <p>
            <strong>{t(`${base}.publisher.nameLabel`)} :</strong>{" "}
            {t(`${base}.publisher.nameValue`)}
          </p>
          <p>
            <strong>{t(`${base}.publisher.statusLabel`)} :</strong>{" "}
            {t(`${base}.publisher.statusValue`)}
          </p>
          <p>
            <strong>{t(`${base}.publisher.emailLabel`)} :</strong>{" "}
            {t(`${base}.publisher.emailValue`)}
          </p>
          <p>
            <strong>{t(`${base}.publisher.addressLabel`)} :</strong>{" "}
            {t(`${base}.publisher.addressValue`)}
          </p>
          <p>
            <strong>{t(`${base}.publisher.siretLabel`)} :</strong>{" "}
            {t(`${base}.publisher.siretValue`)}
          </p>
        </div>
        <div>
          <h2>{t(`${base}.publication.title`)}</h2>
          <p>{t(`${base}.publication.value`)}</p>
        </div>
        <div>
          <h2>{t(`${base}.hosting.title`)}</h2>
          <p>
            <strong>{t(`${base}.hosting.providerLabel`)} :</strong>{" "}
            {t(`${base}.hosting.providerValue`)}
          </p>
          <p>
            <strong>{t(`${base}.hosting.addressLabel`)} :</strong>{" "}
            {t(`${base}.hosting.addressValue`)}
          </p>
        </div>
        <div>
          <h2>{t(`${base}.ip.title`)}</h2>
          <p>{t(`${base}.ip.text`)}</p>
        </div>
      </div>
    </main>
  );
}
