/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
  "colors": {
    "tertiary-container": "#68574d",
    "on-tertiary-container": "#e5cec1",
    "surface-dim": "#e2d9ca",
    "surface-container-high": "var(--tan)",
    "secondary-fixed-dim": "#dbc2ad",
    "surface-bright": "#fff8f2",
    "outline": "var(--ink)",
    "primary": "#85170a",
    "surface-container-highest": "#ebe1d2",
    "on-error": "#ffffff",
    "on-primary-fixed-variant": "#8a1c0d",
    "primary-fixed-dim": "#ffb4a7",
    "error": "#ba1a1a",
    "on-background": "#1f1b12",
    "on-error-container": "#93000a",
    "secondary-fixed": "#f9dec8",
    "error-container": "#ffdad6",
    "on-secondary-fixed": "#26190b",
    "surface-container": "var(--card)",
    "on-secondary-container": "#735f4d",
    "inverse-on-surface": "#faefe0",
    "tertiary-fixed": "#f6ded0",
    "surface": "var(--paper)",
    "primary-container": "var(--brick)",
    "on-primary-fixed": "#400200",
    "on-primary-container": "#ffffff",
    "on-surface-variant": "var(--muted)",
    "tertiary": "#4f4036",
    "on-secondary-fixed-variant": "#554333",
    "on-tertiary-fixed-variant": "#53443a",
    "outline-variant": "var(--tan)",
    "on-tertiary-fixed": "#251911",
    "secondary": "#6e5b49",
    "on-tertiary": "#ffffff",
    "surface-variant": "#ebe1d2",
    "surface-container-low": "#fdf2e3",
    "primary-fixed": "#ffdad4",
    "background": "#fff8f2",
    "on-primary": "#ffffff",
    "on-surface": "var(--ink)",
    "on-secondary": "#ffffff",
    "inverse-surface": "#353026",
    "tertiary-fixed-dim": "#d9c2b5",
    "secondary-container": "#f6dbc5",
    "surface-container-lowest": "var(--card)",
    "inverse-primary": "#ffb4a7",
    "surface-tint": "#ab3422",
    "paper": "var(--paper)",
    "card": "var(--card)",
    "tan": "var(--tan)",
    "ink": "var(--ink)",
    "muted": "var(--muted)",
    "brick": "var(--brick)",
    "brick-btn": "var(--brick-btn)"
  },
  "borderRadius": {
    "DEFAULT": "0.25rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "full": "9999px"
  },
  "spacing": {
    "margin-mobile": "1.25rem",
    "gutter-mobile": "1rem",
    "space-xs": "0.375rem",
    "space-xl": "3.5rem",
    "space-md": "1.25rem",
    "space-lg": "2rem",
    "gutter": "1.5rem",
    "space-sm": "0.75rem",
    "margin": "3rem"
  },
  "fontFamily": {
    "title-editorial": [
      "var(--font-newsreader)",
      "Newsreader",
      "Georgia",
      "serif"
    ],
    "display-hero-mobile": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "headline-md": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "body-sm": [
      "var(--font-newsreader)",
      "Newsreader",
      "serif"
    ],
    "display-hero": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "headline-lg": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "body-md": [
      "var(--font-newsreader)",
      "Newsreader",
      "serif"
    ],
    "label-smallcaps": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "headline-sm": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "headline-lg-mobile": [
      "var(--font-eb-garamond)",
      "EB Garamond",
      "serif"
    ],
    "body-lg": [
      "var(--font-newsreader)",
      "Newsreader",
      "serif"
    ],
    "complexity-notation": [
      "var(--font-space-mono)",
      "Space Mono",
      "monospace"
    ]
  },
  "fontSize": {
    "title-editorial": [
      "1.375rem",
      {
        "lineHeight": "1.4",
        "letterSpacing": "0.01em",
        "fontWeight": "600"
      }
    ],
    "display-hero-mobile": [
      "2.75rem",
      {
        "lineHeight": "1.1",
        "letterSpacing": "-0.01em",
        "fontWeight": "600"
      }
    ],
    "headline-md": [
      "2.25rem",
      {
        "lineHeight": "1.25",
        "fontWeight": "500"
      }
    ],
    "body-sm": [
      "0.875rem",
      {
        "lineHeight": "1.5",
        "fontWeight": "400"
      }
    ],
    "display-hero": [
      "4.5rem",
      {
        "lineHeight": "1.05",
        "letterSpacing": "-0.02em",
        "fontWeight": "600"
      }
    ],
    "headline-lg": [
      "3rem",
      {
        "lineHeight": "1.15",
        "letterSpacing": "-0.015em",
        "fontWeight": "500"
      }
    ],
    "body-md": [
      "1rem",
      {
        "lineHeight": "1.65",
        "fontWeight": "400"
      }
    ],
    "label-smallcaps": [
      "0.875rem",
      {
        "lineHeight": "1.2",
        "letterSpacing": "0.14em",
        "fontWeight": "700"
      }
    ],
    "headline-sm": [
      "1.75rem",
      {
        "lineHeight": "1.3",
        "fontWeight": "600"
      }
    ],
    "headline-lg-mobile": [
      "2rem",
      {
        "lineHeight": "1.2",
        "letterSpacing": "0em",
        "fontWeight": "500"
      }
    ],
    "body-lg": [
      "1.125rem",
      {
        "lineHeight": "1.6",
        "fontWeight": "400"
      }
    ],
    "complexity-notation": [
      "0.8125rem",
      {
        "lineHeight": "1",
        "letterSpacing": "0.04em",
        "fontWeight": "700"
      }
    ]
  }
}
  },
  plugins: []
};
