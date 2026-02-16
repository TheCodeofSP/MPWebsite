import { useMemo, useState } from "react";
import { useContent } from "../content/ContentProvider.jsx";
import "./contact.scss";
import {
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
  FiCopy,
} from "react-icons/fi";

function normalizePhone(value) {
  return String(value || "").replace(/\s/g, "");
}

function buildMailto(to, subject, body) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

export default function Contact() {
  const { t, loading, error } = useContent();

  const intro = t("contact.intro", {});
  const methods = t("contact.content.methods", []);
  const form = t("contact.content.form", {});
  const labels = form?.fields ?? {};

  const selects = form?.selects ?? {};
  const profileSelect = selects?.profile ?? {};
  const topicSelect = selects?.topic ?? {};

  const safeMethods = useMemo(
    () => (Array.isArray(methods) ? methods : []),
    [methods],
  );

  const emailMethod = safeMethods.find((m) => m.type === "email");
  const phoneMethod = safeMethods.find((m) => m.type === "phone");

  // options de profil = celles de Home, via path configurable
  const profileOptionsPath =
    profileSelect?.optionsPath || "home.profileSelector.options";
  const profileOptions = t(profileOptionsPath, []);
  const safeProfileOptions = useMemo(
    () => (Array.isArray(profileOptions) ? profileOptions : []),
    [profileOptions],
  );

  const topicsByProfile = topicSelect?.optionsByProfile ?? {};

  const [values, setValues] = useState({
    profile: "",
    topic: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" }); // idle | success | error
  const [copied, setCopied] = useState("");

  // options de topic selon profil sélectionné
  const topicOptions = useMemo(() => {
    const list = topicsByProfile?.[values.profile];
    return Array.isArray(list) ? list : [];
  }, [topicsByProfile, values.profile]);

  const errors = useMemo(() => {
    const e = {};

    if (!values.profile) e.profile = "Veuillez choisir votre profil.";
    if (!values.topic) e.topic = "Veuillez préciser votre demande.";

    if (!values.name.trim()) e.name = "Veuillez renseigner votre nom.";

    if (!values.email.trim()) e.email = "Veuillez renseigner votre email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = "Email invalide.";

    // téléphone optionnel
    if (!values.message.trim() || values.message.trim().length < 10)
      e.message = "Votre message est trop court (min. 10 caractères).";

    if (!values.consent) e.consent = "Merci de confirmer votre accord.";

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const onChange = (key) => (e) => {
    const next = key === "consent" ? e.target.checked : e.target.value;

    setValues((v) => {
      if (key === "profile") {
        // reset topic si le profil change
        return { ...v, profile: next, topic: "" };
      }
      return { ...v, [key]: next };
    });
  };

  const onBlur = (key) => () => setTouched((t0) => ({ ...t0, [key]: true }));
  const showError = (key) => touched[key] && errors[key];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      // non bloquant
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({
      profile: true,
      topic: true,
      name: true,
      email: true,
      phone: true,
      message: true,
      consent: true,
    });

    if (!isValid) {
      setStatus({
        type: "error",
        message: "Merci de corriger les champs signalés.",
      });
      return;
    }

    const to = emailMethod?.value || "contact@example.com";

    const selectedProfileLabel =
      safeProfileOptions.find((o) => o.key === values.profile)?.label ||
      values.profile;

    const selectedTopicLabel =
      topicOptions.find((o) => o.value === values.topic)?.label || values.topic;

    const subject = `Demande de contact – ${selectedProfileLabel} – ${values.name}`;

    const body = [
      `Profil : ${selectedProfileLabel}`,
      `Demande : ${selectedTopicLabel}`,
      `Nom : ${values.name}`,
      `Email : ${values.email}`,
      values.phone ? `Téléphone : ${values.phone}` : null,
      "",
      "Message :",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = buildMailto(to, subject, body);

    setStatus({
      type: "success",
      message:
        "Votre message est prêt à être envoyé via votre logiciel de messagerie. Si rien ne s’ouvre, utilisez l’email ou le téléphone ci-dessous.",
    });
  };

  if (loading) {
    return (
      <main className="contact">
        <div className="contact__container">
          <p>Chargement…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="contact">
        <div className="contact__container">
          <p>Erreur : {String(error.message || error)}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="contact">
      <div className="contact__container">
        {/* HERO */}
        <header className="contact__hero">
          <h1 className="contact__title">{intro?.title ?? "Contact"}</h1>
          {intro?.subtitle && (
            <p className="contact__kicker">{intro.subtitle}</p>
          )}
          {intro?.lead && <p className="contact__lead">{intro.lead}</p>}
        </header>

        <div className="contact__layout">
          {/* Colonne gauche : méthodes */}
          <aside className="contact__side">
            <div className="contact__sideCard">
              <h2 className="contact__h2">Coordonnées</h2>

              <div className="contact__methods">
                {safeMethods.map((m, idx) => {
                  const isEmail = m.type === "email";
                  const isPhone = m.type === "phone";
                  const Icon = isEmail
                    ? FiMail
                    : isPhone
                      ? FiPhone
                      : FiCheckCircle;

                  const href = isEmail
                    ? `mailto:${m.value}`
                    : isPhone
                      ? `tel:${normalizePhone(m.value)}`
                      : undefined;

                  return (
                    <div key={idx} className="contact__method">
                      <div className="contact__methodIcon" aria-hidden="true">
                        <Icon />
                      </div>

                      <div className="contact__methodBody">
                        <p className="contact__methodLabel">{m.label}</p>

                        {href ? (
                          <a className="contact__methodValue" href={href}>
                            {m.value}
                          </a>
                        ) : (
                          <p className="contact__methodValue">{m.value}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        className="contact__copy"
                        onClick={() => handleCopy(m.value)}
                        aria-label={`Copier ${m.label}`}
                        title="Copier"
                      >
                        <FiCopy />
                        <span className="contact__copyText">
                          {copied === m.value ? "Copié" : "Copier"}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="contact__note">
                Réponse dès que possible. En cas d’urgence, contactez les
                services adaptés.
              </p>
            </div>
          </aside>

          {/* Colonne droite : formulaire */}
          <section className="contact__main">
            <div className="contact__card contact__card--reveal">
              <h2 className="contact__h2">Écrire un message</h2>

              {status.type !== "idle" && (
                <div
                  className={`contact__alert ${
                    status.type === "success" ? "is-success" : "is-error"
                  }`}
                  role="status"
                >
                  <span className="contact__alertIcon" aria-hidden="true">
                    {status.type === "success" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiAlertCircle />
                    )}
                  </span>
                  <p className="contact__alertText">{status.message}</p>
                </div>
              )}

              <form className="contact__form" onSubmit={onSubmit} noValidate>
                <div className="contact__grid">
                  {/* Select profil */}
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="profile">
                      {profileSelect?.label ?? "Je suis…"}
                    </label>

                    <select
                      id="profile"
                      className={`contact__select ${showError("profile") ? "has-error" : ""}`}
                      value={values.profile}
                      onChange={onChange("profile")}
                      onBlur={onBlur("profile")}
                    >
                      <option value="">
                        {profileSelect?.placeholder ?? "Choisir…"}
                      </option>
                      {safeProfileOptions.map((opt) => (
                        <option key={opt.key} value={opt.key}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {showError("profile") && (
                      <p className="contact__error">{errors.profile}</p>
                    )}
                  </div>

                  {/* Select topic dépendant (masqué tant que profil vide) */}
                  <div
                    className={`contact__field ${!values.profile ? "is-hidden" : ""}`}
                  >
                    <label className="contact__label" htmlFor="topic">
                      {topicSelect?.label ?? "Ma demande concerne…"}
                    </label>

                    <select
                      id="topic"
                      className={`contact__select ${showError("topic") ? "has-error" : ""}`}
                      value={values.topic}
                      onChange={onChange("topic")}
                      onBlur={onBlur("topic")}
                      disabled={!values.profile}
                    >
                      <option value="">
                        {topicSelect?.placeholder ?? "Choisir…"}
                      </option>
                      {topicOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {showError("topic") && (
                      <p className="contact__error">{errors.topic}</p>
                    )}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="name">
                      {labels?.name ?? "Nom"}
                    </label>
                    <input
                      id="name"
                      className={`contact__input ${showError("name") ? "has-error" : ""}`}
                      type="text"
                      value={values.name}
                      onChange={onChange("name")}
                      onBlur={onBlur("name")}
                      autoComplete="name"
                      placeholder="Votre nom"
                    />
                    {showError("name") && (
                      <p className="contact__error">{errors.name}</p>
                    )}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="email">
                      {labels?.email ?? "Email"}
                    </label>
                    <input
                      id="email"
                      className={`contact__input ${showError("email") ? "has-error" : ""}`}
                      type="email"
                      value={values.email}
                      onChange={onChange("email")}
                      onBlur={onBlur("email")}
                      autoComplete="email"
                      placeholder="vous@exemple.fr"
                    />
                    {showError("email") && (
                      <p className="contact__error">{errors.email}</p>
                    )}
                  </div>

                  <div className="contact__field contact__field--full">
                    <label className="contact__label" htmlFor="phone">
                      {labels?.phone ?? "Téléphone"}{" "}
                      <span className="contact__optional">(optionnel)</span>
                    </label>
                    <input
                      id="phone"
                      className="contact__input"
                      type="tel"
                      value={values.phone}
                      onChange={onChange("phone")}
                      onBlur={onBlur("phone")}
                      autoComplete="tel"
                      placeholder="06 00 00 00 00"
                    />
                  </div>

                  <div className="contact__field contact__field--full">
                    <label className="contact__label" htmlFor="message">
                      {labels?.message ?? "Message"}
                    </label>
                    <textarea
                      id="message"
                      className={`contact__textarea ${showError("message") ? "has-error" : ""}`}
                      value={values.message}
                      onChange={onChange("message")}
                      onBlur={onBlur("message")}
                      rows={6}
                      placeholder="Décrivez brièvement votre situation et vos objectifs…"
                    />
                    {showError("message") && (
                      <p className="contact__error">{errors.message}</p>
                    )}
                  </div>

                  <div className="contact__field contact__field--full">
                    <label
                      className={`contact__consent ${showError("consent") ? "has-error" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={values.consent}
                        onChange={onChange("consent")}
                        onBlur={onBlur("consent")}
                      />
                      <span>
                        {form?.consent ?? "J’accepte d’être recontacté(e)."}
                      </span>
                    </label>
                    {showError("consent") && (
                      <p className="contact__error">{errors.consent}</p>
                    )}
                  </div>
                </div>

                <div className="contact__actions">
                  <button
                    className="contact__btn"
                    type="submit"
                    disabled={!isValid}
                  >
                    Envoyer
                  </button>

                  {emailMethod?.value && (
                    <a
                      className="contact__alt"
                      href={`mailto:${emailMethod.value}`}
                    >
                      Ou écrire directement par email
                    </a>
                  )}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
