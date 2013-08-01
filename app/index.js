'use strict';

var util = require('util'),
    path = require('path'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');

var PixGenerator = module.exports = function PixGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.coscupYeoman = require('../lib/util/common').coscupYeoman;
};

util.inherits(PixGenerator, yeoman.generators.Base);

PixGenerator.prototype.askFor = function askFor() {

    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.coscupYeoman);

    var prompts = [{
        name: 'appName',
        message: 'What is the app name ?',
        default: 'testApp'
    },
    {
        name: 'domainName',
        message: 'What is the domain name of this project ?',
        default: ''
    },{
        type: 'confirm',
        name: 'useAngularJs',
        message: 'Would you like to use AngularJs ?',
        default: true
    },{
        type: 'confirm',
        name: 'useCompassBootstrap',
        message: 'Would you like to use Twitter Bootstrap for Compass (as opposed to vanilla CSS)?',
        default: true
    }];

    this.prompt(prompts, function (props) {

        this.appName = props.appName;
        this.domainName = props.domainName;
        this.useAngularJs = props.useAngularJs;
        this.useCompassBootstrap = props.useCompassBootstrap;

        cb();
    }.bind(this));
};

PixGenerator.prototype.createCommonFolders = function createCommonFolders() {

    var dirs = [
        'webdata/controllers',
        'webdata/helpers',
        'webdata/libs',
        'webdata/models',
        'webdata/views',
        'webroot/static/css',
        'webroot/static/js'
    ];

    dirs.forEach(function(dir){
        this.mkdir(dir);
    }.bind(this));
};

PixGenerator.prototype.includePixCoreFiles = function () {

    var templates = [
        'webdata/init.inc.php',
        'webdata/controllers/IndexController.php',
        'webdata/controllers/ErrorController.php',
        'webdata/views/index/index.phtml',
        'webdata/views/common/header.phtml',
        'webdata/views/common/footer.phtml',
        'webdata/libs/ApplicationAction.php',
        'webdata/libs/HelperLib.php',
        'webdata/debug.php',
        'webroot/index.php',
        'webroot/static/css/main.src.css',
    ];

    templates.forEach(function(path){
        this.copy(path, path);
    }.bind(this));

    if (this.useCompassBootstrap) {
      this.template('use_compass_bootstrap/_bower.json', 'bower.json', { appName: this.appName });
      this.copy('use_compass_bootstrap/main.src.scss', 'webroot/static/sass/main.src.scss');
    } else {
      this.template('_bower.json', 'bower.json', { appName: this.appName });
    }
};

PixGenerator.prototype.createAngularFolders = function() {

    if (! this.useAngularJs) {
        return;
    }

    var dirs = [
        'webroot/static/js/controllers',
        'webroot/static/js/directives',
        'webroot/static/js/filters',
        'webroot/static/js/services'
    ];

    dirs.forEach(function(dir){
        this.mkdir(dir);
    }.bind(this));
};

PixGenerator.prototype.includeAngularFiles = function() {

    if (! this.useAngularJs) {
        return;
    }

    fs.unlink('webdata/views/index/index.phtml');
    fs.unlink('webdata/views/common/header.phtml');
    fs.unlink('webdata/views/common/footer.phtml');
    fs.unlink('bower.json');

    var templates = [
        'webdata/views/index/index.phtml',
        'webdata/views/index/tmpl/about.phtml',
        'webdata/views/common/header.phtml',
        'webdata/views/common/footer.phtml'
    ];
    templates.forEach(function(path){
        this.copy('use_angular/' + path, path);
    }.bind(this));

    var templates = [
        'webdata/views/index/tmpl/main.phtml',
        'webroot/static/js/app.js',
        'webroot/static/js/controllers/main.js',
        'webroot/static/js/controllers/about.js',
        'webroot/static/js/directives/sampleDirective.js',
        'webroot/static/js/services/sampleService.js',
        'webroot/static/js/filters/sampleFilter.js'
    ];

    templates.forEach(function(path){
        this.template('use_angular/' + path, path, { appName: this.appName, domainName: this.domainName });
    }.bind(this));

    if (this.useCompassBootstrap) {
      this.template('use_angular/use_compass_bootstrap/_bower.json', 'bower.json', { appName: this.appName });
    } else {
      this.template('use_angular/_bower.json', 'bower.json', { appName: this.appName });
    }
};

PixGenerator.prototype.projectfiles = function projectfiles() {

    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_README', 'README.md');
    this.copy('_htaccess', 'webroot/.htaccess');
    this.copy('_gitignore', '.gitignore');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_package.json', 'package.json');
    this.copy('_composer.json', 'composer.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.template('_Makefile', 'Makefile', { domainName: this.domainName });
};
