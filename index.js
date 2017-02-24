const
  packJs = require('./lib/pack-js'),
  packLess = require('./lib/pack-less');

module.exports = (...args) => {
  console.info('Calling bundit directly is deprecated and will be removed in future versions.');
  console.info('Use bundit.packJs(...) instead.');

  return packJs(...args);
};

Object.assign(module.exports, {
  packJs,
  packLess,
});
