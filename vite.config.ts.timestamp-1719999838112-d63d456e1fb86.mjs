// vite.config.ts
import { qwikCity } from "file:///C:/Users/trieu/Desktop/gh/sab-olymfit/node_modules/@builder.io/qwik-city/vite/index.mjs";
import { qwikVite } from "file:///C:/Users/trieu/Desktop/gh/sab-olymfit/node_modules/@builder.io/qwik/optimizer.mjs";
import { defineConfig } from "file:///C:/Users/trieu/Desktop/gh/sab-olymfit/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Users/trieu/Desktop/gh/sab-olymfit/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "sab-olymfit",
  description: "SAB Olymfit",
  private: true,
  type: "module",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  scripts: {
    build: "yarn add sharp --ignore-engines && qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/vercel-edge/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    clean: "rm -rf ./dist ./server ./tmp ./.vercel",
    deploy: "vercel deploy",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  trustedDependencies: [
    "sharp"
  ],
  dependencies: {
    sharp: "^0.33.4"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.6.0",
    "@builder.io/qwik-city": "^1.6.0",
    "@qwik-ui/headless": "^0.4.4",
    "@tailwindcss/forms": "^0.5.7",
    "@types/eslint": "^8.56.10",
    "@types/node": "^20.12.7",
    "@typescript-eslint/eslint-plugin": "^7.7.1",
    "@typescript-eslint/parser": "^7.7.1",
    autoprefixer: "^10.4.14",
    eslint: "^8.57.0",
    "eslint-plugin-qwik": "^1.6.0",
    postcss: "^8.4.31",
    prettier: "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.4",
    "qwik-sonner": "^1.0.3",
    tailwindcss: "3.3.3",
    typescript: "5.4.5",
    undici: "*",
    vercel: "^29.1.1",
    vite: "^5.2.10",
    "vite-tsconfig-paths": "^4.2.1"
  }
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    optimizeDeps: { exclude: [] },
    server: {
      headers: { "Cache-Control": "public, max-age=0" }
    },
    preview: {
      headers: { "Cache-Control": "public, max-age=300" }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  let msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) throw new Error(msg);
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) throw new Error(msg);
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdHJpZXVcXFxcRGVza3RvcFxcXFxnaFxcXFxzYWItb2x5bWZpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdHJpZXVcXFxcRGVza3RvcFxcXFxnaFxcXFxzYWItb2x5bWZpdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdHJpZXUvRGVza3RvcC9naC9zYWItb2x5bWZpdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHF3aWtDaXR5IH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XHJcbmltcG9ydCB7IHF3aWtWaXRlIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWsvb3B0aW1pemVyXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuXHJcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XHJcblxyXG50eXBlIFBrZ0RlcCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbmNvbnN0IHsgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwa2cgYXMgYW55IGFzIHtcclxuICBkZXBlbmRlbmNpZXM6IFBrZ0RlcDtcclxuICBkZXZEZXBlbmRlbmNpZXM6IFBrZ0RlcDtcclxuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xyXG59O1xyXG5cclxuZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKGRldkRlcGVuZGVuY2llcywgZGVwZW5kZW5jaWVzKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pOiBVc2VyQ29uZmlnID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW3F3aWtDaXR5KCksIHF3aWtWaXRlKCksIHRzY29uZmlnUGF0aHMoKV0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHsgZXhjbHVkZTogW10gfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBoZWFkZXJzOiB7IFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCIgfSxcclxuICAgIH0sXHJcbiAgICBwcmV2aWV3OiB7XHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTMwMFwiIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKFxyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4pIHtcclxuICBjb25zdCBkdXBsaWNhdGVEZXBzID0gT2JqZWN0LmtleXMoZGV2RGVwZW5kZW5jaWVzKS5maWx0ZXIoXHJcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcclxuICApO1xyXG4gIGNvbnN0IHF3aWtQa2cgPSBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLmZpbHRlcigodmFsdWUpID0+XHJcbiAgICAvcXdpay9pLnRlc3QodmFsdWUpLFxyXG4gICk7XHJcblxyXG4gIGxldCBtc2cgPSBgTW92ZSBxd2lrIHBhY2thZ2VzICR7cXdpa1BrZy5qb2luKFwiLCBcIil9IHRvIGRldkRlcGVuZGVuY2llc2A7XHJcbiAgaWYgKHF3aWtQa2cubGVuZ3RoID4gMCkgdGhyb3cgbmV3IEVycm9yKG1zZyk7XHJcblxyXG4gIG1zZyA9IGBcclxuICAgIFdhcm5pbmc6IFRoZSBkZXBlbmRlbmN5IFwiJHtkdXBsaWNhdGVEZXBzLmpvaW4oXCIsIFwiKX1cIiBpcyBsaXN0ZWQgaW4gYm90aCBcImRldkRlcGVuZGVuY2llc1wiIGFuZCBcImRlcGVuZGVuY2llc1wiLlxyXG4gICAgUGxlYXNlIG1vdmUgdGhlIGR1cGxpY2F0ZWQgZGVwZW5kZW5jaWVzIHRvIFwiZGV2RGVwZW5kZW5jaWVzXCIgb25seSBhbmQgcmVtb3ZlIGl0IGZyb20gXCJkZXBlbmRlbmNpZXNcIlxyXG4gIGA7XHJcbiAgaWYgKGR1cGxpY2F0ZURlcHMubGVuZ3RoID4gMCkgdGhyb3cgbmV3IEVycm9yKG1zZyk7XHJcbn1cclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJzYWItb2x5bWZpdFwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTQUIgT2x5bWZpdFwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwiZW5naW5lc1wiOiB7XHJcbiAgICBcIm5vZGVcIjogXCJeMTguMTcuMCB8fCBeMjAuMy4wIHx8ID49MjEuMC4wXCJcclxuICB9LFxyXG4gIFwiZW5naW5lcy1hbm5vdGF0aW9uXCI6IFwiTW9zdGx5IHJlcXVpcmVkIGJ5IHNoYXJwIHdoaWNoIG5lZWRzIGEgTm9kZS1BUEkgdjkgY29tcGF0aWJsZSBydW50aW1lXCIsXHJcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzLWFubm90YXRpb25cIjogXCJOZWVkZWQgZm9yIGJ1biB0byBhbGxvdyBydW5uaW5nIGluc3RhbGwgc2NyaXB0c1wiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImJ1aWxkXCI6IFwieWFybiBhZGQgc2hhcnAgLS1pZ25vcmUtZW5naW5lcyAmJiBxd2lrIGJ1aWxkXCIsXHJcbiAgICBcImJ1aWxkLmNsaWVudFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwiYnVpbGQucHJldmlld1wiOiBcInZpdGUgYnVpbGQgLS1zc3Igc3JjL2VudHJ5LnByZXZpZXcudHN4XCIsXHJcbiAgICBcImJ1aWxkLnNlcnZlclwiOiBcInZpdGUgYnVpbGQgLWMgYWRhcHRlcnMvdmVyY2VsLWVkZ2Uvdml0ZS5jb25maWcudHNcIixcclxuICAgIFwiYnVpbGQudHlwZXNcIjogXCJ0c2MgLS1pbmNyZW1lbnRhbCAtLW5vRW1pdFwiLFxyXG4gICAgXCJjbGVhblwiOiBcInJtIC1yZiAuL2Rpc3QgLi9zZXJ2ZXIgLi90bXAgLi8udmVyY2VsXCIsXHJcbiAgICBcImRlcGxveVwiOiBcInZlcmNlbCBkZXBsb3lcIixcclxuICAgIFwiZGV2XCI6IFwidml0ZSAtLW1vZGUgc3NyXCIsXHJcbiAgICBcImRldi5kZWJ1Z1wiOiBcIm5vZGUgLS1pbnNwZWN0LWJyayAuL25vZGVfbW9kdWxlcy92aXRlL2Jpbi92aXRlLmpzIC0tbW9kZSBzc3IgLS1mb3JjZVwiLFxyXG4gICAgXCJmbXRcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIixcclxuICAgIFwiZm10LmNoZWNrXCI6IFwicHJldHRpZXIgLS1jaGVjayAuXCIsXHJcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgXFxcInNyYy8qKi8qLnRzKlxcXCJcIixcclxuICAgIFwicHJldmlld1wiOiBcInF3aWsgYnVpbGQgcHJldmlldyAmJiB2aXRlIHByZXZpZXcgLS1vcGVuXCIsXHJcbiAgICBcInN0YXJ0XCI6IFwidml0ZSAtLW9wZW4gLS1tb2RlIHNzclwiLFxyXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiXHJcbiAgfSxcclxuICBcInRydXN0ZWREZXBlbmRlbmNpZXNcIjogW1xyXG4gICAgXCJzaGFycFwiXHJcbiAgXSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcInNoYXJwXCI6IFwiXjAuMzMuNFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBidWlsZGVyLmlvL3F3aWtcIjogXCJeMS42LjBcIixcclxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5XCI6IFwiXjEuNi4wXCIsXHJcbiAgICBcIkBxd2lrLXVpL2hlYWRsZXNzXCI6IFwiXjAuNC40XCIsXHJcbiAgICBcIkB0YWlsd2luZGNzcy9mb3Jtc1wiOiBcIl4wLjUuN1wiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiXjguNTYuMTBcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTIuN1wiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjcuMVwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuNy4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE0XCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1xd2lrXCI6IFwiXjEuNi4wXCIsXHJcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjMxXCIsXHJcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMi41XCIsXHJcbiAgICBcInByZXR0aWVyLXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4wLjUuNFwiLFxyXG4gICAgXCJxd2lrLXNvbm5lclwiOiBcIl4xLjAuM1wiLFxyXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIjMuMy4zXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCI1LjQuNVwiLFxyXG4gICAgXCJ1bmRpY2lcIjogXCIqXCIsXHJcbiAgICBcInZlcmNlbFwiOiBcIl4yOS4xLjFcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjIuMTBcIixcclxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMVwiXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxnQkFBZ0I7QUFDdFUsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxvQkFBcUM7QUFDOUMsT0FBTyxtQkFBbUI7OztBQ0gxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtB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
