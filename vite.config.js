import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import { resolve } from "path";
import { glob } from "glob";
import { fileURLToPath, URL } from "node:url";

function discoverComponentEntries() {
  const entries = {};
  const componentScripts = glob.sync("src/components/**/script.js");

  componentScripts.forEach((file) => {
    const matches = file.match(/src\/components\/([^\/]+)\/script\.js$/);
    if (matches) {
      const name = matches[1];
      entries[`components/${name}`] = resolve(process.cwd(), file);
    }
  });

  return entries;
}

function discoverBlockEntries() {
  const entries = {};
  const blockScripts = glob.sync("src/blocks/*/index.js");
  const blockStyles = glob.sync("src/blocks/*/style.scss");

  blockScripts.forEach((file) => {
    const normalized = file.replace(/\\/g, "/");
    const matches = normalized.match(/src\/blocks\/([^\/]+)\/index\.js$/);
    if (matches) {
      const name = matches[1];
      entries[`blocks/${name}/index`] = resolve(process.cwd(), file);
    }
  });

  blockStyles.forEach((file) => {
    const normalized = file.replace(/\\/g, "/");
    const matches = normalized.match(/src\/blocks\/([^\/]+)\/style\.scss$/);
    if (matches) {
      const name = matches[1];
      entries[`blocks/${name}/style`] = resolve(process.cwd(), file);
    }
  });

  return entries;
}

export default defineConfig({
  plugins: [
    liveReload([process.cwd() + "/**/*.php", process.cwd() + "/**/*.twig"]),
  ],

  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "src/js/main.js"),
        style: resolve(process.cwd(), "src/scss/main.scss"),
        ...discoverComponentEntries(),
        ...discoverBlockEntries(),
      },
      external: [
        "@wordpress/blocks",
        "@wordpress/element",
        "@wordpress/block-editor",
        "@wordpress/components",
        "@wordpress/i18n",
        "@wordpress/data",
        "@wordpress/compose",
        "@wordpress/hooks",
        "@wordpress/api-fetch",
        "@wordpress/url",
        "@wordpress/date",
      ],
      output: {
        globals: {
          "@wordpress/blocks": "wp.blocks",
          "@wordpress/element": "wp.element",
          "@wordpress/block-editor": "wp.blockEditor",
          "@wordpress/components": "wp.components",
          "@wordpress/i18n": "wp.i18n",
          "@wordpress/data": "wp.data",
          "@wordpress/compose": "wp.compose",
          "@wordpress/hooks": "wp.hooks",
          "@wordpress/api-fetch": "wp.apiFetch",
          "@wordpress/url": "wp.url",
          "@wordpress/date": "wp.date",
        },
        entryFileNames: (chunk) =>
          chunk.name.startsWith("blocks/") ? "[name].js" : "[name]-[hash].js",
        assetFileNames: (asset) =>
          asset.name?.includes("blocks/")
            ? asset.name.replace(
                /blocks\/([^\/]+)\/style\.css/,
                "blocks/$1/style.css"
              )
            : "[name]-[hash].[ext]",
      },
    },
    outDir: "assets",
    assetsDir: "",
    manifest: true,
    emptyOutDir: true,
  },

  server: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    cors: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/scss/variables" as *;`,
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
    },
  },
});
