import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: process.env.NODE_ENV === 'production' ? `/marketing-components/` : '/',
  publicPath:
    process.env.NODE_ENV === 'production' ? `/marketing-components/` : '/',
});
