module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: "400px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
