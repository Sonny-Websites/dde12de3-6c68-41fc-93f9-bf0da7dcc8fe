import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// BASE_PATH is set in GitHub Actions to /<repo-name>/ for project Pages. Omit or set to '/' for user/org Pages.
const base = process.env.BASE_PATH ?? '/';
// Full production URL (include path segment when base is not '/'). Set in CI; local builds default for sitemap generation.
const site =
  process.env.SITE_URL ??
  (base !== '/' ? `http://localhost:4321${base.replace(/\/$/, '')}` : 'http://localhost:4321');

export default defineConfig({
  output: 'static',
  base,
  site,
  integrations: [sitemap()],
});
