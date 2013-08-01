'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    angularUtils = require('../util.js'),
    ScriptBase = require('../script-base.js'),
    _ = require('../lib/util/string')._;

var Generator = module.exports = function Generator(args, options, config) {

    ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.files = function files() {

    var controllerPath = 'webroot/static/app/scripts/controllers/' + this.name + '.js',
        templateArgs = { name: this.name, appName: this.appName };

    this.template('controller.js', controllerPath, templateArgs);
};
