import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ContentContext = createContext(null);

function getByPath(obj, path, fallback) {
  if (!path) return fallback;

  const parts = path.split(".").filter(Boolean);
  let current = obj;

  for (const key of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object" ||
      !(key in current)
    ) {
      return fallback;
    }
    current = current[key];
  }

  return current ?? fallback;
}

export function ContentProvider({ children, url = "/content.json" }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Anti-cache simple : paramètre de version
      const cacheBuster = `v=${Date.now()}`;
      const res = await fetch(`${url}?${cacheBuster}`, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`Impossible de charger ${url} (HTTP ${res.status})`);
      }

      const data = await res.json();
      setContent(data);
    } catch (e) {
      setError(e);
      setContent(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  const api = useMemo(() => {
    const source = content ?? {};

    const t = (path, fallback) => getByPath(source, path, fallback);

    const has = (path) => {
      const sentinel = "__MISSING__" + Math.random();
      return t(path, sentinel) !== sentinel;
    };

    const section = (key, fallback) => t(key, fallback);

    return {
      content: source,
      loading,
      error,
      reload: load,
      t,
      has,
      section,
    };
  }, [content, loading, error, load]);

  return (
    <ContentContext.Provider value={api}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent doit être utilisé dans <ContentProvider>.");
  }
  return ctx;
}
