import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ficheiros estáticos em `out/`, para o GitHub Pages.
  output: "export",
  trailingSlash: true,
  // O servidor escuta em 0.0.0.0, mas a página abre em 127.0.0.1.
  // Sem isto, o modo dev bloqueia a hidratação e o formulário não responde.
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
};

export default nextConfig;
