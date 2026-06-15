/** @type {import('tailwindcss').Config} */

// Brand tokens are defined as space-separated RGB channels in :root (see src/index.css)
// and referenced here via rgb(var(--token) / <alpha-value>) so Tailwind opacity
// modifiers (e.g. border-ink/10, bg-brand/90) work correctly.
const withAlpha = (cssVar) => `rgb(var(${cssVar}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: withAlpha('--brand'),
          secondary: withAlpha('--brand-secondary'),
          tertiary: withAlpha('--brand-tertiary'),
          accent: withAlpha('--brand-accent'),
          accent2: withAlpha('--brand-accent-2'),
        },
        ink: {
          DEFAULT: withAlpha('--ink'),
          soft: withAlpha('--ink-soft'),
        },
        surface: {
          DEFAULT: withAlpha('--surface'),
          muted: withAlpha('--surface-muted'),
        },
        border: withAlpha('--border'),

        // Semantic aliases so the Button component variants resolve.
        primary: withAlpha('--brand'),
        'primary-foreground': withAlpha('--surface'),
        ring: withAlpha('--brand'),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      boxShadow: {
        card: '0 1px 3px rgb(11 31 51 / 0.04), 0 12px 32px -12px rgb(11 31 51 / 0.12)',
        'card-lg': '0 2px 6px rgb(11 31 51 / 0.05), 0 28px 64px -22px rgb(11 31 51 / 0.20)',
        'brand-glow': '0 16px 40px -12px rgb(4 135 226 / 0.45)',
      },
      backgroundImage: {
        'hero-wash':
          'radial-gradient(120% 80% at 70% -10%, rgb(176 214 245 / 0.45) 0%, rgb(244 249 254 / 0) 55%)',
      },
    },
  },
  plugins: [],
}
