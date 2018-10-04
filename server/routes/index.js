const routes = require('./routes');

function buildRoutes(app) {
  const routesConfig = Object.entries(routes);

  routesConfig.forEach(registerRoute);

  function registerRoute(routeEntry) {
    const [routeConfig, routeAction] = routeEntry;
    const [method, route] = routeConfig.split(' ');

    app[method.toLowerCase()](route, routeAction);
  }

  return app;
}

module.exports = buildRoutes;