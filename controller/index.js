'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    angularUtils = require('../util.js'),
    _ = require('../lib/util/string')._;

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {

    yeoman.generators.NamedBase.apply(this, arguments);

    this.argument('actionName', {
        'type': String,
        'required': false
    });

    this.desc('This creates a pix controller and its view file by default.');

    this.option('json', {
        'desc': 'Generate a controller to output json.'
    });

    this.option('noview', {
        'desc': 'Generate a controller without view file.'
    });

    this.getActionFuncTmpl = function() {

        if (this.options.noview) {
            return [
                'public function ' + this.actionName + 'Action()',
                '{',
                '    return $this->noview()',
                '}'
            ];
        }

        if (this.options.json) {
            return [
                'public function ' + this.actionName + 'Action()',
                '{',
                '    return $this->json([',
                "        'error' => false,",
                "        'message' => 'This is " + this.controllerName + " Controller and " + this.actionName + " action.',",
                ']);',
                '}'
            ];
        }

        return [
            'public function ' + this.actionName + 'Action()',
            '{',
            '}'
        ];
    };

    this.handleAction = function() {

      var hasError = false;

      try {
        angularUtils.rewriteFile({
          file: 'webdata/controllers/' + this.controllerName + 'Controller.php',
          needle: '// endbuild',
          splicable: this.getActionFuncTmpl()
        });
      } catch (e) {
          hasError = true;
          var msg = 'Unable to find controller file. Try yo pix:controller '
                  + this.controllerName + ' to create a pix controller.';
          this.log.error(msg);
      }

      if (! hasError) {
          this.log.ok('Write ' + this.actionName + ' action successfully.');
      }

      if ((! this.options.noview) && (! this.options.json)) {

        var path = 'webdata/views/' + this.controllerName.toLowerCase() + '/' + this.actionName + '.phtml';

        this.template('view.phtml', path, {
            controllerName: this.controllerName,
            actionName: this.actionName
        });
      }
    };

};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {

  this.controllerName = _.capitalize(this.name);

  var controllerPath = 'webdata/controllers/' + this.controllerName + 'Controller.php',
      templateArgs = { controllerName: this.controllerName };

  if (this.actionName && (this.actionName.length > 0)) {

      this.actionName = this.actionName;
      this.handleAction();

  } else if (this.options.noview) {

    this.template('controllerNoView.php', controllerPath, templateArgs);

  } else if (this.options.json) {

    this.template('controllerReturnJson.php', controllerPath, templateArgs);

  } else {

    this.template('controller.php', controllerPath, templateArgs);

    this.template('view.phtml',
        'webdata/views/' + this.controllerName.toLowerCase() + '/index.phtml',
        { controllerName: this.controllerName, actionName: 'index' });
  }

};
