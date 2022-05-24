module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: "400px",
      },
      colors: {
        primary: "#ff385c",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
