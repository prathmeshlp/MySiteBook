/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {   
      height: {
        cardHeight: "16rem",
        heightNoDataContainer: "calc(100vh - 12.1875rem)",
        heightMainContainer: "calc(100vh - 5rem)",
        heightMainContainerSmall: "calc(100vh - 4rem)",
        sampleProjectHeight: "142px",
        activeProjectHeight: "180px",
        archieveProjectHeight: "180px",
        projectOptionsMenuHeight: "225px",
        projectOptionsMenuWidth: "225px",
        tableHeight: "calc(100vh - 15rem)",
       
      },
      colors: {
        bgHeader: "#fdd332",
        textColor: "#3e4551",
        darkGray: "#64748b",
        lightGray: "#f5f5f5",
        primaryBlue: "#0d6efd",
        secondaryGrey: "#6c757d",
        successGreen: "#198754",
        lightGreen: "#cbe7c4",
        textGreen: "#259d0a",
        infoBlue: "#198754",
        warningYellow: "#fdd332",
        dangerRed: "#ef4444",
        light: "#e5e7eb",
        dark: "#21252",
        bghOverProject: "rgba(0, 0, 0, 0.195)",
        createQuoteIconBg: "#3880ff",
      },
      backgroundImage: {
        "bg-mySiteBookLogoLarge": "url('./assets/large-site-book-logo.png')",
      },
      spacing: {
        122: "7.5rem",
        640: "40rem",
      },
    },
  },
  plugins: [],
};
