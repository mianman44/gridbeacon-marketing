import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    /* Inlined into the server and client bundles alike, so both can
       ask "was the upgrade offer running when this site was built?"
       and agree on the header's first render (lib/upgrade-offer.ts). */
    BUILD_STARTED_AT: String(Date.now()),
  },
  /* Sample report files under /reports are supporting material, not
     pages: keep them out of search results so they do not compete
     with the HTML pages that explain them. */
  async headers() {
    return [
      {
        source: "/reports/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
