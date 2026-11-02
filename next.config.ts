import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    /* Inlined into the server and client bundles alike, so both can
       ask "was the upgrade offer running when this site was built?"
       and agree on the header's first render (lib/upgrade-offer.ts). */
    BUILD_STARTED_AT: String(Date.now()),
  },
};

export default nextConfig;
