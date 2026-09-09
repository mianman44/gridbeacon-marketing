module.exports={
  "theme": {
    "extend": {
      "fontFamily": {
        "sans": [
          "\"Plus Jakarta Sans\"",
          "sans-serif"
        ]
      },
      "colors": {
        "brand": {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#0f172a"
        },
        "surface": {
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#e2e8f0",
          "300": "#cbd5e1",
          "800": "#1e293b",
          "900": "#0f172a",
          "950": "#020617"
        }
      },
      "boxShadow": {
        "glow-blue": "0 0 25px -5px rgba(37, 99, 235, 0.35)",
        "subtle": "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "card": "0 4px 20px -2px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  "content": [
    "./components/marketing/stitch-how.html",
    "./components/marketing/stitch-how.tsx"
  ],
  "important": "#stitch-how",
  "corePlugins": {
    "preflight": false
  }
}