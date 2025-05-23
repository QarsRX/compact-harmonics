// vuetify.js

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { md3 } from "vuetify/blueprints";

const charcoalDarkTheme = {
  dark: true,
  colors: {
    background: "#1E1E2F", // Charcoal background
    surface: "#2A2A3D", // Slightly lighter surface
    primary: "#90CAF9", // Soft blue
    secondary: "#424242", // Gray for subtle elements
    accent: "#64FFDA", // Teal accent (for charts, highlights)
    error: "#EF5350",
    info: "#29B6F6",
    success: "#66BB6A",
    warning: "#FFA726",
  },
};

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: "charcoalDarkTheme",
    themes: {
      charcoalDarkTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});
