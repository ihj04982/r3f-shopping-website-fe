import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.glb", "**/*.gltf"],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split(".");
                    const ext = info[info.length - 1];
                    if (/glb|gltf/i.test(ext)) {
                        return `models/[name][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
        },
    },
    optimizeDeps: {
        exclude: ["three/examples/jsm/loaders/GLTFLoader.js"],
    },
});
