const angularDependencies = [];

const angular = require('angular');

require('bootstrap-css-only');
angularDependencies.push(require('angular-ui-bootstrap'));

angularDependencies.push(require('./app/sitemap.js'));

// Load stylesheet globally
require('./styles/app.scss');

module.exports = angular.module('app', angularDependencies)
  .name;
