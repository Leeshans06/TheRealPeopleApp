
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-PU4AHCNR.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 27957, hash: '56a13d2dd5765872bf01d73af7ebd8a9708791dd20f0204108f37b29583396bd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17260, hash: '7cdefd6996d3fea87a79c682f12360296dbdb83377a7a6b8e36fd35f4a8813f6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JOHGNCUL.css': {size: 238754, hash: '0FdxM7MZfYo', text: () => import('./assets-chunks/styles-JOHGNCUL_css.mjs').then(m => m.default)}
  },
};
