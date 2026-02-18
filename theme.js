(() => {
  const STORAGE_KEY = "portfolio-theme";
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";

  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) {
      return savedTheme;
    }

    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? DARK_THEME : LIGHT_THEME;
  };

  const applyTheme = (theme, buttons) => {
    const selectedTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
    const isDark = selectedTheme === DARK_THEME;

    const root = document.documentElement;
    root.classList.toggle("dark-theme", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    buttons.forEach((button) => {
      const isActive = button.dataset.theme === selectedTheme;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const themeButtons = Array.from(document.querySelectorAll(".theme-btn"));
  if (!themeButtons.length) {
    return;
  }

  const initialTheme = getSavedTheme();
  applyTheme(initialTheme, themeButtons);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTheme = button.dataset.theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
      localStorage.setItem(STORAGE_KEY, selectedTheme);
      applyTheme(selectedTheme, themeButtons);
    });
  });
})();
