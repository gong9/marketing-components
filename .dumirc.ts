import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  publicPath:
    process.env.NODE_ENV === 'production' ? `/marketing-components/` : '/',
});
