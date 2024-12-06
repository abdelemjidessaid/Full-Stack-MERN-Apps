/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "0.9rem", // Adjust the small text size
        base: "1rem", // Adjust the base (default) text size
        lg: "1.1rem", // Adjust the large text size
        xl: "1.2rem", // Adjust the extra-large text size
        // Add other sizes if needed
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "4.5rem",
        },
      },
    },
  },
  plugins: [],
};
