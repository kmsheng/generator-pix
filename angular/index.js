'use strict';

var path = require('path'),
    fs = require('fs'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('../lib/util/string')._;

var Generator = module.exports = function Generator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    /*this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });*/

    this.createAngularFolders = function() {

        var self = this;

        var dirs = [
            'webroot/static/js/controllers',
            'webroot/static/js/directives',
            'webroot/static/js/filters',
            'webroot/static/js/services'
        ];

        dirs.forEach(function(dir){
            self.mkdir(dir);
        });
    };

    this.includeAngularFiles = function() {

        var self = this;

        var templates = [
            'webdata/views/index/index.phtml',
            'webdata/views/index/tmpl/main.phtml',
            'webdata/views/index/tmpl/route2.phtml',
            'webdata/views/common/header.phtml',
            'webdata/views/common/footer.phtml',
            'webroot/static/js/app.js',
            'webroot/static/js/controllers/main.js',
            'webroot/static/js/controllers/route2.js',
            'bower.json'
        ];
        templates.forEach(function(path){
            self.copy(path, path);
        });

        self.copy('bowerrc', '.bowerrc');
    };

};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.files = function files() {

    fs.unlink('webdata/views/index/index.phtml');
    fs.unlink('webdata/views/common/header.phtml');
    fs.unlink('webdata/views/common/footer.phtml');
    fs.unlink('webdata/views/common/bower.json');

    /*this.createAngularFolders();
    this.includeAngularFiles();*/
        this.copy('bowerrc', '.bowerrc');
        console.log('here');
};
