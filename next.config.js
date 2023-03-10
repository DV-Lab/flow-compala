/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const intercept = require("intercept-stdout");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: false,
  output: "standalone",
  images: {
    domains: ["assets.laligagolazos.com"],
  },
  publicRuntimeConfig: {
    TEAM_NAME: process.env.TEAM_NAME || "UNKNOWN",
    IS_DEV: process.env.NODE_ENV !== "production",
    GOLAZOS_ADDRESS: process.env.GOLAZOS_ADDRESS,
  },
});

/**
 * Hide warning of RecoilJS when hot reload
 */
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = nextConfig;
