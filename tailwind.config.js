module.exports = {
  theme: {
    extend: {
      darkSelector: ".dark-mode",
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          tertiary: "var(--brand-tertiary)",
          neutral: "var(--brand-neutral)",
          onPrimary: "var(--brand-on-primary)",
          onSecondary: "var(--brand-on-secondary)",
          formPrimary: "var(--brand-form-primary)",
          formSecondary: "var(--brand-form-secondary)",
          formText: "var(--brand-form-text)"
          // on: {
          //   primary: "var(--brand-on-primary)",
          //   secondary: "var(--brand-on-secondary)"
          // }
        }
      },
      fontFamily: {
        brand: [
          "Quicksand",
          "Source Sans Pro",
          "-apple - system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans - serif"
        ]
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6.25rem"
      },
      screens: {
        "xl-max": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "lg-max": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "md-max": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "sm-max": { max: "639px" }
        // => @media (max-width: 639px) { ... }
      },
      boxShadow: {
        brand: "0 2px 2px var(--brand-form-primary)"
      },
      spacing: {
        "72": "18rem"
      },
      height: {
        fit: "fit-content"
      },
      zIndex: {
        "1024": "1024"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: [
        "dark",
        "dark-hover",
        "dark-group-hover",
        "dark-even",
        "dark-odd",
        "hover",
        "responsive"
      ],
      borderColor: [
        "dark",
        "dark-focus",
        "dark-focus-within",
        "hover",
        "responsive"
      ],
      textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"]
    }
  },
  plugins: [require("tailwindcss-dark-mode")()],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js",
      // TypeScript
      "plugins/**/*.ts",
      "nuxt.config.ts"
    ]
  }
};
