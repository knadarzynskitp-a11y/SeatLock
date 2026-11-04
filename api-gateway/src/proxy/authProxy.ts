import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL ?? "http://auth-service:3001",
    changeOrigin: true,
    proxyTimeout: 5000,

    on: {
        error: (err, req, res) => {
            if ("writeHead" in res && !res.headersSent) {
                res.writeHead(502, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "AuthService unavailable"
                }));
            }
        }
    }
})



