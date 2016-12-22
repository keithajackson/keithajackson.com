// UI-Router definition and 'seam' for lazy loading
// Everything wrapped by a "require.ensure" will be lazy-loaded.
// Load this file and call .register() to set up the ui-router state.

const controllerName = '404Controller';
const moduleName = 'app.404';
const stateName = 'notFound';

const controllerModuleName = `${moduleName}.controller`;
const routingModuleName = `${moduleName}.routing`;

const register = () => {
  const angular = require('angular');

  const angularDependencies = [
    require('oclazyload'),
    require('angular-ui-router'),
  ];

  const lazyLoadTemplate = () => new Promise((resolve) => {
    require.ensure([], () => resolve(require('./template.html')));
  });

  const lazyLoadController = ($ocLazyLoad) => {
    'ngInject';

    return new Promise((resolve, reject) => {
      require.ensure([], () => {
        try {
          require('./controller.js')(controllerModuleName, controllerName);

          // $ocLazyLoad will asynchronously load the module into the app
          // namespace for us
          $ocLazyLoad.load({ name: controllerModuleName });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  const configureState = ($stateProvider) => {
    'ngInject';

    $stateProvider.state(stateName, {
      controller: controllerName,
      controllerAs: 'vm',
      templateProvider: lazyLoadTemplate,
      resolve: {
        controller: lazyLoadController,
      },
    });
  };

  return angular.module(routingModuleName, angularDependencies)
    .config(configureState)
    .name;
};

module.exports = {
  register,
  controllerName,
  moduleName,
  stateName,
};
