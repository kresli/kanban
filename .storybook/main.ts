import type { StorybookConfig } from "@storybook/react-vite";

import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: async (config) => {
    // Exclude the problematic dependencies
    if (config.optimizeDeps) {
      config.optimizeDeps.exclude = [
        ...(config.optimizeDeps.exclude || []),
        "storybook-vite-docs",
        "DocsRenderer",
      ];
    }

    // Add the assetsInclude configuration for Vite
    const assetsInclude: (string | RegExp)[] = [];
    if (config.assetsInclude) {
      if (Array.isArray(config.assetsInclude)) {
        assetsInclude.push(...config.assetsInclude);
      } else {
        assetsInclude.push(config.assetsInclude);
      }
    }
    assetsInclude.push("/sb-preview/runtime.js");
    config.assetsInclude = assetsInclude;

    return config;
  },
};

export default config;
