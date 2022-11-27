import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'mcp',
    nav: [
      {
        title: '介绍',
        link: '/guide',
      },
      {
        title: '组件',
        link: '/components/lottery',
      },
    ],
  },
  outputPath: 'docs-dist',
  base: process.env.NODE_ENV === 'production' ? `/marketing-components/` : '/',
  publicPath:
    process.env.NODE_ENV === 'production' ? `/marketing-components/` : '/',
});
