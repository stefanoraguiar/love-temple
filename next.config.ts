import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O servidor escuta em 0.0.0.0, mas a página abre em 127.0.0.1.
  // Sem isto, o modo dev bloqueia a hidratação e o formulário não responde.
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
