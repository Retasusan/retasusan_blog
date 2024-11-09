import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  daisyui: {
    themes: ["corporate"],
  },
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
  plugins: [daisyui],
};
export default config;
