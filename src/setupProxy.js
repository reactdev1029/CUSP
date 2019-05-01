const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'https://dev-api.v1.bkstg.it',
      changeOrigin: true,
    }),
  );
  app.use(
    proxy('/v1', {
      target: 'https://dev-clips.v1.bkstg.it/api',
      changeOrigin: true,
    }),
  );
};
