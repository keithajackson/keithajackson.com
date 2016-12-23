// This must be a JS file rather than JSON because we need to require() the
// images in order for Webpack to bundle them.
module.exports = [{
  name: 'Astonishers Webcomic Reader',
  url: 'http://www.astonishers.net',
  preview: require('./previews/astonishers.gif'),
  sourceCodeUrl: 'https://github.com/keithajackson/astonishers.net',
  description: [
    'Mobile and desktop-friendly experience',
    'Fetches all content dynamically from existing comic blog using Tumblr API',
    'Generates user-friendly chapter/page navigation system using Tumblr post tags',
    'Uses local cookies to remember user\'s place in the comic',
  ],
  client: {
    name: 'Chel Traynor',
    url: 'http://ctrayn.weebly.com',
  },
  date: 'May 2014',
  technologies: [
    { name: 'JavaScript (ES5)', url: 'http://ecma-international.org/ecma-262/5.1/' },
    { name: 'jQuery Mobile', url: 'https://jquerymobile.com/' },
  ],
}, {
  name: 'keithajackson.com',
  url: 'https://www.keithajackson.com',
  // preview: require('./previews/astonishers.gif'),
  sourceCodeUrl: 'https://github.com/keithajackson/keithajackson.com',
  description: [
    'Demonstrates single-page-app architecture for large applications',
    'Page states lazy-loaded to minimize first-load footprint',
    'Loads data from JS/JSON to populate view',
    'Uses airbnb eslint for code style',
  ],
  date: 'December 2016',
  technologies: [
    { name: 'JavaScript (ES2015)', url: 'http://www.ecma-international.org/ecma-262/6.0/' },
    { name: 'Angular 1.x', url: 'https://angularjs.org/' },
    { name: 'Webpack', url: 'https://webpack.github.io/' },
    { name: 'Eslint', url: 'http://eslint.org/' },
  ],
}];
