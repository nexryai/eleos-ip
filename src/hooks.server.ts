import type { Handle } from "@sveltejs/kit";

const securityHeaders = {
    "Access-Control-Allow-Origin": "null",
    "Permissions-Policy": "interest-cohort=(), browsing-topics=(), accelerometer=(), camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=(), ambient-light-sensor=(), battery=(), local-fonts=(), magnetometer=(), serial=(), usb=(), window-management=()",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Cross-Origin-Opener-Policy": "noopener-allow-popups"
};

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    // biome-ignore lint/suspicious/useIterableCallbackReturn: ignore for readability
    Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));

    return response;
};