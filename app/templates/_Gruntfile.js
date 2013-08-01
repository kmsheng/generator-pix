module.exports = function (grunt) {

    'use strict';

    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-open');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    var config = {
        pixControllersPath: 'webdata/controllers',
        pixViewsPath: 'webdata/views',
        appPath: 'webroot/static',
        jsPath: 'webroot/static/js',
        tempPath: 'temp'
    };

    grunt.initConfig({
        config: config,
        ngmin: {
            others : {
                src: ['<%= config.jsPath %>/app.js'],
                dest: '<%= config.tempPath %>/others.js'
            },
            controllers: {
                src: ['<%= config.jsPath %>/controllers/*.js'],
                dest: '<%= config.tempPath %>/controllers.js'
            },
            directives: {
                src: ['<%= config.jsPath %>/directives/*.js', '<%= config.jsPath %>/directives/*/*.js'],
                dest: '<%= config.tempPath %>/directives.js'
            },
            factories: {
                src: ['<%= config.jsPath %>/factories/*.js'],
                dest: '<%= config.tempPath %>/factories.js'
            },
            services: {
                src: ['<%= config.jsPath %>/services/*.js'],
                dest: '<%= config.tempPath %>/services.js'
            },
            filters: {
                src: ['<%= config.jsPath %>/filters/*.js'],
                dest: '<%= config.tempPath %>/filters.js'
            }
        },
        concat: {
            js: {
                src: [
                    '<%= config.tempPath %>/others.js',
                    '<%= config.tempPath %>/controllers.js',
                    '<%= config.tempPath %>/directives.js',
                    '<%= config.tempPath %>/factories.js',
                    '<%= config.tempPath %>/services.js',
                    '<%= config.tempPath %>/filters.js'
                ],
                dest: '<%= config.tempPath %>/one.js'
            }
        },
        uglify: {
            one: {
                expand: true,
                cwd: '<%= config.tempPath %>',
                ext: '.min.js',
                src: 'one.js',
                dest: '<%= config.appPath %>/dest'
            },
            libs: {
                expand: true,
                cwd: '<%= config.appPath %>/libs',
                ext: '.min.js',
                src: '**/*.src.js',
                dest: '<%= config.appPath %>/libs'
            }
        },
        compass: {
            dest: {
                options: {
                    httpPath: '/',
                    cssDir: '<%= config.appPath %>/css',
                    sassDir: '<%= config.appPath %>/sass',
                    imagesDir: '<%= config.appPath %>/img',
                    importPath: '<%= config.appPath %>/components'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= config.appPath %>/css/',
                src: ['*.src.css', '!*.min.css'],
                dest: '<%= config.appPath %>/css/',
                ext: '.min.css'
            }
        },
        watch: {
            options: {
                livereload: 1337,
                nospawn: true
            },
            compass: {
                files: ['<%= config.appPath %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:dest']
            },
            pixControllersFiles: {
                files: ['<%= config.pixControllersPath %>/**/*.php']
            },
            pixViewsFiles: {
                files: ['<%= config.pixViewsPath %>/**/*.phtml']
            },
            scripts: {
                files: ['<%= config.jsPath %>/**/*.js']
            },
            images: {
                files: ['<%= config.appPath %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },
        open: {
            testSite: {
                path: 'http://localhost'
            }
        },
        jshint: {
            all: ['Gruntfile.js', '<%= config.jsPath %>/**/*.js']
        }
    });

    grunt.registerTask('server', ['compass', 'open', 'watch']);
    grunt.registerTask('build', ['ngmin', 'concat', 'uglify', 'compass', 'cssmin']);
};
