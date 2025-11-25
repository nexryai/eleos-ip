import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter({
            // See below for an explanation of these options
            config: undefined,
            platformProxy: {
                configPath: undefined,
                environment: undefined,
                persist: undefined,
            },
            fallback: "plaintext",
            routes: {
                include: ["/*"],
                exclude: ["<all>"],
            },
        }),
        csp: {
            mode: "nonce",
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'"],
                "style-src": ["'self'"],
                "img-src": ["'self'", "data:", "https://api.mapbox.com"],
                "font-src": ["'self'", "data:"],
                "connect-src": ["'self'"],
                "frame-src": ["'none'"],
            }
        }
    },
};

export default config;
