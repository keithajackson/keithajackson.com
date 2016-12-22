// UI-Router definition and 'seam' for lazy loading
// Core app includes this file to know what bundle to call,
// and ocLazyLoad bundles all the files that register() requires into a
// single bundle.

const controllerName = 'HomeController';
const moduleName = 'app.home';
const stateName = 'home';

const controllerModuleName = `${moduleName}.controller`;
const routingModuleName = `${moduleName}.routing`;

const register = ({ url }) => {
  const angular = require('angular');

  const angularDependencies = [
    require('oclazyload'),
    require('angular-ui-router'),
  ];

  function addState($stateProvider) {
    $stateProvider.state(stateName, {
      url,
      controller: controllerName,
      controllerAs: 'vm',
      templateProvider: () => new Promise((resolve) => {
        require.ensure([], () => resolve(require('./template.html')));
      }),
      resolve: {
        controller: ['$ocLazyLoad', $ocLazyLoad => new Promise((resolve) => {
          require.ensure([], () => {
            require('./controller.js')(controllerModuleName, controllerName);

            $ocLazyLoad.load({ name: controllerModuleName });
            resolve();
          });
        })],
      },
    });
  }

  addState.$inject = ['$stateProvider'];

  return angular.module(routingModuleName, angularDependencies)
    .config(addState)
    .name;
};

module.exports = {
  register,
  controllerName,
  moduleName,
  stateName,
};
