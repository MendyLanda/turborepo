import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
import { REDIRECTS_FOR_V2_DOCS } from "./lib/redirects/v2-docs.mjs";

const withMDX = createMDX();
const vercelToolbar = withVercelToolbar();

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 1800,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Next.js still expects these to return Promises even without await
  // eslint-disable-next-line @typescript-eslint/require-await -- Purposeful.
  async rewrites() {
    return {
      beforeFiles:
        process.env.VERCEL_ENV === "production"
          ? [
              {
                source: "/sitemap.xml",
                destination:
                  "https://crawled-sitemap.vercel.sh/turbobuild-sitemap.xml",
              },
              {
                source: "/api/feedback",
                destination: "https://vercel.com/api/feedback",
              },
            ]
          : undefined,
    };
  },
  // Next.js still expects these to return Promises even without await
  // eslint-disable-next-line @typescript-eslint/require-await -- Purposeful.
  async redirects() {
    return [
      {
        source: "/usage",
        destination: "/repo/docs/reference/command-line-reference",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/running-tasks",
        destination: "/repo/docs/core-concepts/monorepos/running-tasks",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/why-turborepo",
        destination: "/repo/docs/core-concepts/monorepos",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/filtering",
        destination: "/repo/docs/core-concepts/monorepos/filtering",
        permanent: true,
      },
      {
        source: "/docs/guides/workspaces",
        destination: "/repo/docs/handbook/workspaces",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/workspaces",
        destination: "/repo/docs/handbook/workspaces",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/pipelines",
        destination: "/repo/docs/core-concepts/monorepos/running-tasks",
        permanent: true,
      },
      {
        source: "/docs/guides/migrate-from-lerna",
        destination: "/repo/docs/handbook/migrating-to-a-monorepo",
        permanent: true,
      },
      {
        source: "/discord{/}?",
        destination: "https://community.vercel.com/tag/turborepo",
        permanent: true,
      },
      {
        source: "/docs/changelog",
        destination: "https://github.com/vercel/turbo/releases",
        permanent: true,
      },
      {
        source: "/docs/guides/complimentary-tools",
        destination: "/repo/docs/handbook",
        permanent: true,
      },
      {
        source: "/docs/guides/monorepo-tools",
        destination: "/repo/docs/handbook",
        permanent: true,
      },
      {
        source: "/docs/glossary",
        destination: "/repo/docs/handbook",
        permanent: true,
      },
      {
        source: "/docs/guides/continuous-integration",
        destination: "/repo/docs/ci",
        permanent: true,
      },
      {
        source: "/repo/docs/handbook/prisma",
        destination: "/repo/docs/handbook/tools/prisma",
        permanent: true,
      },
      {
        source: "/repo/docs/platform-environment-variables",
        destination:
          "/repo/docs/crafting-your-repository/using-environment-variables#platform-environment-variables",
        permanent: true,
      },
      ...REDIRECTS_FOR_V2_DOCS.map((route) => ({
        source: route.source,
        destination: route.destination,
        permanent: true,
      })),
      // March 4, 2025: Removal of Turbopack from these docs
      {
        source: "/pack/:slug*",
        destination: "https://nextjs.org/docs/app/api-reference/turbopack",
        permanent: true,
      },
      {
        source: "/blog/turbopack-benchmarks",
        destination: "https://nextjs.org/docs/app/api-reference/turbopack",
        permanent: true,
      },
      {
        // Redirect old blog posts to new blog.
        source: "/posts/:path*",
        destination: "/blog/:path*",
        permanent: true,
      },
      {
        source: "/repo/docs/:slug*",
        destination: "/docs/:slug*",
        permanent: true,
      },
      // OpenAPI redirects (until we have more content)
      {
        source: "/docs/openapi",
        destination: "/repo/docs/openapi/artifacts/artifact-exists",
        permanent: false,
      },
      {
        source: "/docs/openapi/artifacts",
        destination: "/repo/docs/openapi/artifacts/artifact-exists",
        permanent: false,
      },
      {
        source: "/docs/getting-started/support-policy",
        destination: "/docs/support-policy",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/monorepos/filtering",
        destination:
          "docs/crafting-your-repository/running-tasks#using-filters",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/monorepos/running-tasks",
        destination: "/docs/crafting-your-repository/running-tasks",
        permanent: true,
      },
      {
        source: "/docs/core-concepts/caching",
        destination: "/docs/crafting-your-repository/caching",
        permanent: true,
      },
    ];
  },
};

// Required by Next.js, but we've extracted the config into a named export as well
export default withMDX(vercelToolbar(config));
