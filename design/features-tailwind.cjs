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
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a"
        },
        "obsidian": "#0b0f19",
        "surface": "#f8faff",
        "rank": {
          "green": "#10b981",
          "blue": "#2563eb",
          "amber": "#f59e0b",
          "red": "#ef4444"
        }
      },
      "boxShadow": {
        "glow": "0 0 35px -5px rgba(37, 99, 235, 0.25)",
        "card": "0 10px 30px -5px rgba(15, 23, 42, 0.05)",
        "card-hover": "0 20px 40px -10px rgba(15, 23, 42, 0.1)"
      }
    }
  },
  "content": [
    "./components/marketing/stitch-features.html"
  ],
  "important": "#stitch-features",
  "corePlugins": {
    "preflight": false
  }
}