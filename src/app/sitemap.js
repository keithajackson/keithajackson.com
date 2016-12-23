// Define all the routing setup in a single place to make maintenance easier
const angular = require('angular');

// Load and configure all the route modules in one place
// Just loading the module will add a config block for UI router;
// as long as we make these prerequisites for the sitemap, we can guarantee
// that all of the configs will run before the app starts.
const stateDefinitionModules = [
  require('./home/routing').register({
    url: '/home',
  }),
  require('./experience/routing').register({
    url: '/experience',
  }),
  require('./portfolio/routing').register({
    url: '/portfolio',
  }),
  require('./contact/routing').register({
    url: '/contact',
  }),
  require('./404/routing').register({}),
];

// Configure ui-router to load the 404 page when an unknown route is encountered
const unknownRouteHandler = ($urlRouterProvider, $locationProvider) => {
  'ngInject';

  const notFoundStateName = require('./404/routing').stateName;
  $locationProvider.html5Mode(true);

  function unknownStateHandler($injector) {
    return $injector.get('$state').go(notFoundStateName);
  }

  // We must explicitly $inject here because .otherwise doesn't accept
  // the normal [dependency, dependency, function] array format that ngInject
  // returns.
  unknownStateHandler.$inject = ['$injector'];

  $urlRouterProvider.otherwise(unknownStateHandler);
};

module.exports = angular.module('app.sitemap', stateDefinitionModules)
  .config(unknownRouteHandler)
  .name;
