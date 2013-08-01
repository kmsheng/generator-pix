'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('../lib/util/string')._;

var TableGenerator = module.exports = function TableGenerator(args, options, config) {

    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(TableGenerator, yeoman.generators.NamedBase);

TableGenerator.prototype.files = function files() {

  this.tableName = _.capitalize(this.name);

  var tablePath = 'webdata/models/' + this.tableName + '.php',
      templateArgs = { tableName: this.tableName };

  this.template('table.php', tablePath, templateArgs);
};
