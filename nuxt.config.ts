export default defineNuxtConfig({
  compatibilityDate: "2026-11-07",
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  srcDir: "app/",
  devtools: { enabled: false },
  telemetry: false,
  css: [
    "~/assets/main.css",
    "~/assets/sidebar.css",
    "~/assets/portfolio.css",
    "~/assets/markdown.css",
    "~/assets/article.css",
    "prismjs/themes/prism-okaidia.css",
  ],
  app: {
    head: {
      htmlAttrs: { lang: "ja" },
      title: "Retasusan | Portfolio",
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/apple-icon.png" },
        { rel: "manifest", href: "/manifest.json" },
      ],
    },
  },
  runtimeConfig: {
    microcmsServiceDomain: "",
    microcmsApiKey: "",
  },
  typescript: { strict: true },
});
