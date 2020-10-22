let development = process.env.NODE_ENV !== "production";
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.APP_NAME,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
    "@nuxtjs/fontawesome"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/toast"],

  axios: {
    baseURL: development
      ? "http://localhost:8000/api/v1"
      : "https://changetonaira.com/api/v1",
    credentials: false
  },

  laoding: {
    color: "#28a745"
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {}
  },

  toast: {
    position: "top-center",
    duration: 3000
  },
  fontawesome: {
    component: "fa",
    suffix: true,
  },

  pageTransition: {
    name: "page",
    mode: "out-in",
    beforeEnter(el) {
      // console.log("Before enter...");
    }
  }
};
