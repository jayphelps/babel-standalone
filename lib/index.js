'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.availablePresets = exports.availablePlugins = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.transform = transform;
exports.transformFromAst = transformFromAst;

var _babelCore = require('babel-core');

var Babel = _interopRequireWildcard(_babelCore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Parses plugin names and presets from the specified options.
 */
function processOptions(options) {
  // Parse preset names
  var presets = (options.presets || []).map(function (presetName) {
    if (typeof presetName === 'string') {
      var preset = availablePresets[presetName];
      if (!preset) {
        throw new Error('Invalid preset specified in Babel options: "' + presetName + '"');
      }
      return preset;
    } else {
      // Could be an actual preset module
      return presetName;
    }
  });

  // Parse plugin names
  var plugins = (options.plugins || []).map(function (pluginName) {
    if (typeof pluginName === 'string') {
      var plugin = availablePlugins[pluginName];
      if (!plugin) {
        throw new Error('Invalid plugin specified in Babel options: "' + pluginName + '"');
      }
      return plugin;
    } else {
      // Could be an actual plugin module
      return pluginName;
    }
  });

  return _extends({}, options, {
    presets: presets,
    plugins: plugins
  });
}

function transform(code, options) {
  return Babel.transform(code, processOptions(options));
}

function transformFromAst(ast, code, options) {
  return Babel.transformFromAst(code, processOptions(options));
}

// All the plugins we should bundle
var availablePlugins = exports.availablePlugins = {};

// All the presets we should bundle
var availablePresets = exports.availablePresets = {
  es2015: require('babel-preset-es2015')
};

var version = exports.version = Babel.version;