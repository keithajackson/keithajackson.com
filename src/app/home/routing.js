// UI-Router definition and 'seam' for lazy loading
// Core app includes this file to know what bundle to call,
// and ocLazyLoad bundles all the files that register() requires into a
// single bundle.

const controllerName = 'HomeController';
const moduleName = 'app.home';
const stateName = 'home';

const controllerModuleName = `${moduleName}.controller`
const routingModuleName = `${moduleName}.routing`

const register = ({ url }) => {
  const angularDependencies = [
    require('oclazyload'),
    require('angular-ui-router')
  ];

  function addState($stateProvider) {
    $stateProvider.state(stateName, {
      url,
      controller: controllerName,
      controllerAs: 'vm',
      template: require('./template.bundled.html'),
      resolve: {
        controller: ['$ocLazyLoad', ($ocLazyLoad) => {
          return new Promise((resolve, reject) => {
            require.ensure([], () => {
              require('./controller.js')(controllerModuleName, controllerName);

              $ocLazyLoad.load({ name: controllerModuleName });
              resolve();
            });
          });
        }]
      }
    });
    console.log('Set up home route');
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
  stateName
};
