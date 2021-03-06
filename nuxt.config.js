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
  css: ["~/assets/css/main.css","~/assets/fontawesome-free-5.13.0-web/css/all.min.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/dotenv",
    [
      "nuxt-fontawesome",
      {
        component: "fa", //customize component name
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faLightbulb"]
          },
          { set: "@fortawesome/free-brands-svg-icons", icons: ["faGithub"] },
          {
            set: "@fortawesome/free-regular-svg-icons",
            icons: ["faLightbulb"]
          },
          { set: "@fortawesome/free-solid-svg-icons", icons: ["faEdit"] }
        ]
      }
    ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/toast"],

  axios: {
    baseURL: development
      ? "http://localhost:8000/api/v1"
      : "https://yoursite.com/api/v1",
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
    position: "top-right",
    duration: 3000
  },

  pageTransition: {
    name: "page",
    mode: "out-in",
    beforeEnter(el) {
      // console.log("Before enter...");
    }
  },
  purgeCSS: {
    whitelist: ["dark-mode"]
  }
};
