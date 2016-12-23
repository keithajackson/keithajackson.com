const angular = require('angular');

const angularDependencies = [];

function HomeController() {
  const vm = this;
  vm.portfolio = require('./portfolio.js');
}

module.exports = function register(moduleName, controllerName) {
  return angular.module(moduleName, angularDependencies)
    .controller(controllerName, HomeController)
    .name;
};
