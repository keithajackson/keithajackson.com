const angular = require('angular');

const angularDependencies = [];

function HomeController() {
  const vm = this;
  vm.experience = require('./experience.json');
}

module.exports = function register(moduleName, controllerName) {
  return angular.module(moduleName, angularDependencies)
    .controller(controllerName, HomeController)
    .name;
};
