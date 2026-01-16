
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#204060",
        "success": "#3D9969",
        "background-light": "#f6f7f8",
        "background-dark": "#14191e",
        "border-slate": "#DAE0E7",
        "sidebar-bg": "#1F2937",
        "sidebar-active": "#2D3A54",
        "sidebar-text": "#9CA3AF",
        "bulk-bg": "#1A2233",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "9999px" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
