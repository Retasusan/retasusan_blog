import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#ffffff", // 白
        accentGray: "#e7eaf0", // グレー
        accentBlue: "#538cfd", // 水色
        accentGreen: "#46dcb9", // 緑
      },
      gridTemplateColumns: {
        "auto-fit-300": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
