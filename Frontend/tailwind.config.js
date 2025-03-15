/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Blue
        secondary: "#FFFFFF", // White
        accent: "#93C5FD" // Light Blue
      }
    }
  },
  plugins: []
};