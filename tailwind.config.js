module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        'negro-mate': '#1E1E1E',
        'gris-oscuro': '#343434',
        'gris-medio': '#4B4B4B',
        'blanco-suave': '#E0E0E0',
        'naranja-vibrante': '#FF9800',
        'verde-bosque': '#2D6A4F',
        'verde-claro': '#52B788',
        'verde-oscuro': '#1B4332',
        // Theme-aware tokens (public site): swap value via the CSS vars in
        // index.css when the `.dark` class is present on <html>.
        'crema': 'rgb(var(--color-crema) / <alpha-value>)',
        'crema-oscuro': 'rgb(var(--color-crema-oscuro) / <alpha-value>)',
        'tinta': 'rgb(var(--color-tinta) / <alpha-value>)',
        'tostado': 'rgb(var(--color-tostado) / <alpha-value>)',
        'superficie': 'rgb(var(--color-superficie) / <alpha-value>)',
        // Fixed (non theme-aware) tones for content that sits on top of a
        // photo — e.g. the Home hero — and must stay legible regardless of
        // the site's light/dark setting.
        'papel': '#F3EEE6',
        'carbon': '#1C1917',
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};