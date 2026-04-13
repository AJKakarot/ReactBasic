import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Parent folder has its own lockfile; without this, Turbopack picks the wrong root.
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
