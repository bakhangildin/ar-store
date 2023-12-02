import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
    plugins: [solid()],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
    server: {
        port: 3000,
    },
    build: {
        target: "esnext",
    },
});
