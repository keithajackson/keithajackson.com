const angularDependencies = [];

const angular = require('angular');

// Load stylesheet globally
require('./styles/app.scss')

// angularDependencies.push(require('angular-bootstrap'));
angularDependencies.push(require('./app/sitemap.js'));

module.exports = angular.module('app', angularDependencies)
  .name;
