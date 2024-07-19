/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "hsl(var(--light-color))",
        "very-light": "hsl(var(--very-light-color))",
        "bg-color": "hsl(var(--bg-color))",
        "bg-alt-color": "hsl(var(--bg-alt-color))",
        "todo-color": "hsl(var(--todo-color))",
        "text-color": "hsl(var(--text-color))",
        "text-alt-color": "hsl(var(--text-alt-color))",
        "text-light-color": "hsl(var(--text-light-color))",
        "blue-color": "hsl(220, 98%, 61%)",
        "gradient-from": "hsl(192, 100%, 67%)",
        "gradient-to": "hsl(280, 87%, 65%)",
      },
    },
  },
  plugins: [],
};
