import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export default defineConfig({
  site: 'https://onchaination.org',
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  vite: {
    // Keep scripts external so Vite finalizes dynamic imports before Astro emits HTML.
    build: { assetsInlineLimit: 0 },
    server: { fs: { allow: [root] } },
    plugins: [
      {
        name: 'watch-knowledge',
        configureServer(server) {
          const paths = [
            'learn',
            'tools',
            'strategies',
            'skills',
            '.onchaination',
            'README.md',
          ].map((p) => root + p);
          server.watcher.add(paths);
          server.watcher.on('all', (_event, path) => {
            if (paths.some((p) => path === p || path.startsWith(p + '/'))) {
              server.moduleGraph.invalidateAll();
              server.ws.send({ type: 'full-reload' });
            }
          });
        },
      },
    ],
  },
});
