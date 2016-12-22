const angular = require('angular');
const angularDependencies = [];

function HomeController() {
  const vm = this;
  vm.sample = 'OK!';
  console.log('Controller loaded!');
}

module.exports = function register(moduleName, controllerName) {
  console.log('Creating controller with', moduleName, controllerName);
  return angular.module(moduleName, angularDependencies)
    .controller(controllerName, HomeController)
    .name;
};
