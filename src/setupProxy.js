const { createProxyMiddleware } = require('http-proxy-middleware');

const API_PROXY_TARGET =
  'https://posological-bea-subacademically.ngrok-free.dev';

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: API_PROXY_TARGET,
      changeOrigin: true,
      pathFilter: ['/api/**', '/images/**', '/uploads/**'],
      on: {
        proxyReq: function(proxyReq) {
          proxyReq.setHeader('ngrok-skip-browser-warning', 'true');
        },
      },
    })
  );
};
