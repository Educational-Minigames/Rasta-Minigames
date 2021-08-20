if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Route.prod');
} else {
  module.exports = require('./Route.dev');
}
