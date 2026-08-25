import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/Spuren-im-Text";

const nextConfig: NextConfig = {
  ...(githubPages ? {
    output: "export" as const,
    assetPrefix: githubPagesBasePath,
    trailingSlash: true,
  } : {}),
};

export default nextConfig;
