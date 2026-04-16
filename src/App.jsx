import React, { useEffect, useMemo, useState } from "react";

const MENU_DATA_URL = `${import.meta.env.BASE_URL}menu.json`;

function translate(value, language) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value[language] ?? value.el ?? value.en ?? "";
}

export default function App() {
  const [language, setLanguage] = useState(
    () => window.localStorage.getItem("lang") || "el",
  );
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMenu() {
      try {
        const response = await fetch(MENU_DATA_URL, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Failed to load menu data: ${response.status}`);
        }

        const data = await response.json();

        if (active) {
          setMenuData(data);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Could not load menu data.");
        }
      }
    }

    loadMenu();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("lang", language);
  }, [language]);

  const labels = useMemo(
    () => ({
      loading: {
        el: "Φόρτωση μενού…",
        en: "Loading menu…",
      },
      error: {
        el: "Δεν ήταν δυνατή η φόρτωση του μενού.",
        en: "The menu could not be loaded.",
      },
    }),
    [],
  );

  if (error) {
    return (
      <div className="status-screen" role="alert">
        <h1>Venetsanos</h1>
        <p>{translate(labels.error, language)}</p>
        <p className="status-detail">{error}</p>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="status-screen" aria-live="polite">
        <h1>Venetsanos</h1>
        <p>{translate(labels.loading, language)}</p>
      </div>
    );
  }

  return (
    <main className="menu-app">
      <header>
        <div className="lang-toggle">
          <button
            id="btn-el"
            className={language === "el" ? "active" : ""}
            onClick={() => setLanguage("el")}
            type="button"
          >
            ΕΛ
          </button>
          <button
            id="btn-en"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
            type="button"
          >
            EN
          </button>
        </div>
        <h1>{menuData.restaurant.name}</h1>
        <p className="tagline">
          {translate(menuData.restaurant.tagline, language)}
        </p>
      </header>

      <nav
        className="category-nav"
        aria-label={translate(menuData.navigationLabel, language)}
      >
        {menuData.sections.map((section) => (
          <a href={`#${section.id}`} key={section.id}>
            {translate(section.title, language)}
          </a>
        ))}
      </nav>

      {menuData.sections.map((section) => (
        <section className="section" id={section.id} key={section.id}>
          <h2>{translate(section.title, language)}</h2>

          {section.items.map((item) => (
            <article className="menu-item" key={item.id}>
              <div className="info">
                <h3>
                  {translate(item.name, language)}
                  {item.badge ? (
                    <span
                      className={`badge${item.badge.variant ? ` ${item.badge.variant}` : ""}`}
                    >
                      {translate(item.badge.label, language)}
                    </span>
                  ) : null}
                </h3>

                {item.description ? (
                  <p>{translate(item.description, language)}</p>
                ) : null}

                {item.allergens ? (
                  <p className="allergens">
                    {translate(item.allergens, language)}
                  </p>
                ) : null}
              </div>
              <span className="price">{item.price}</span>
            </article>
          ))}
        </section>
      ))}

      <footer>
        <p>
          © {menuData.restaurant.year} {menuData.restaurant.name} &nbsp;·&nbsp;
          <a href={`tel:${menuData.restaurant.phoneLink}`}>
            {menuData.restaurant.phone}
          </a>
        </p>
        <p className="footer-note">
          {translate(menuData.restaurant.footerNote, language)}
        </p>
      </footer>
    </main>
  );
}
