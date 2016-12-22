// Define all the route URLs in a single place to make maintenance easier
const angular = require('angular');

const stateDependencies = [
  require('./home/routing').register({
    url: '/',
  }),
  require('./404/routing').register({}),
];

module.exports = angular.module('app.sitemap', stateDependencies)
  .config(($urlRouterProvider, $locationProvider) => {
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
  })
  .name;
