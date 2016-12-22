// UI-Router definition and 'seam' for lazy loading
// Core app includes this file to know what bundle to call,
// and ocLazyLoad bundles all the files that register() requires into a
// single bundle.

const controllerName = '404Controller';
const moduleName = 'app.404';
const stateName = 'notFound';

const controllerModuleName = `${moduleName}.controller`
const routingModuleName = `${moduleName}.routing`

const register = ({ url }) => {
  const angularDependencies = [
    require('oclazyload'),
    require('angular-ui-router')
  ];

  function addState($stateProvider) {
    $stateProvider.state(stateName, {
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
    console.log('Set up route', stateName);
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
