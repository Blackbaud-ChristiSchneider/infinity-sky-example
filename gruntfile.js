﻿/// <vs BeforeBuild='default' SolutionOpened='watch' />
/*jslint nomen: true */
/*global module, require, console */

module.exports = function (grunt) {
    'use strict';

    var jsHintFiles,
        jsHintExclude,
        env,
        utils,
        isDesktopBuild = grunt.option("IsDesktopBuild"),
        initialForceState = grunt.option("force"),
        testResultsFolder,
        isCrmInstallation = true,
        isChristi = true,
        vroot = isChristi ? '' : 'CRM_SP_DEV/';

    console.log("Running Blackbaud.AppFx.MajorGiving.Mobile.Sky/gruntfile.js");
    console.log("IsDesktopBuild: " + isDesktopBuild);

    if (isDesktopBuild !== false) {
        // The build specifies false. Check for exactly "false" rather than undefined or null.
        console.log("IsDesktopBuild was not false. Defaulting true.");
        isDesktopBuild = true;
    }

    jsHintFiles = ['*.js', 'src/**/*.js', 'test/**/*.js'];
    jsHintExclude = ['src/lib/**/*.js'];

    // env + utils are shared
    utils = require('./config/grunt/_utils')(grunt);
    env = require('./config/grunt/_env')(grunt, utils);

    if (isDesktopBuild) {
        testResultsFolder = "TestResults";
    } else {
        testResultsFolder = "../../../../Blackbaud.AppFx.Server/TestResults";
    }

    function renameRemoveHandlerWebConfig(dest) {
        return dest + '/web.config';
    }

    function renameRemoveHandlerWebCustomConfig(dest) {
        return dest + '/web.custom.config';
    }

    function getDestinationFolder(isCustomApp, rootFolder) {
        // Leslie: C:/Program Files/Blackbaud/CRM_SP_DEV/bbappfx/vroot/sky/
        // Christi: C:/Program Files/Blackbaud/bbappfx/vroot/sky/
        var result = (isCrmInstallation ? 'C:/Program Files/Blackbaud/' + vroot + 'bbappfx/vroot/' : '../../../../Blackbaud.AppFx.Server/Deploy/') + (isCustomApp ? 'browser/htmlforms/custom/' : 'sky/') + rootFolder;
        return result;
    }

    function getCopyFiles() {
        return {
            fonts: {
                files: [{
                    expand: true,
                    src: ['*.*'],
                    cwd: 'bower_components/blackbaud-skyux/dist/css/fonts',
                    dest: '<%= buildPath %>/css/sky/fonts'
                }]
            },
            jsbuiltin: {
                files: [{
                    expand: true,
                    src: ['**/*.*'],
                    cwd: 'bower_components/blackbaud-skyux/dist/js',
                    dest: '<%= buildPath %>/js/sky'
                }, {
                    expand: true,
                    src: ['**/*.*'],
                    cwd: 'bower_components/bbui-angular/dist/js',
                    dest: '<%= buildPath %>/js'
                }, {
                    expand: true,
                    src: ['removehandler.web.config'],
                    cwd: 'src',
                    dest: '<%= buildPath %>/js',
                    rename: renameRemoveHandlerWebConfig
                }]
            },
            jscustom: {
                files: [{
                    expand: true,
                    src: ['**/*.*'],
                    cwd: 'bower_components/blackbaud-skyux/dist/js',
                    dest: '<%= buildPath %>/js/sky'
                }, {
                    expand: true,
                    src: ['**/*.*'],
                    cwd: 'bower_components/bbui-angular/dist/js',
                    dest: '<%= buildPath %>/js'
                }, {
                    expand: true,
                    src: ['removehandler.web.config'],
                    cwd: 'src',
                    dest: '<%= buildPath %>/js',
                    rename: renameRemoveHandlerWebCustomConfig
                }]
            },
            htmlbuiltin: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['index.html', 'web.config'],
                    dest: '<%= buildPath %>/'
                }]
            },
            htmlcustom: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['index.example.html', 'web.custom.config'],
                    dest: '<%= buildPath %>/'
                }]
            },
            cssbuiltin: {
                files: [{
                    expand: true,
                    src: ['*.*'],
                    cwd: 'bower_components/blackbaud-skyux/dist/css',
                    dest: '<%= buildPath %>/css/sky'
                }, {
                    expand: true,
                    src: ['removehandler.web.config'],
                    cwd: 'src',
                    dest: '<%= buildPath %>/css',
                    rename: renameRemoveHandlerWebConfig
                }]
            },
            csscustom: {
                files: [{
                    expand: true,
                    src: ['*.*'],
                    cwd: 'bower_components/blackbaud-skyux/dist/css',
                    dest: '<%= buildPath %>/css/sky'
                }, {
                    expand: true,
                    src: ['removehandler.web.config'],
                    cwd: 'src',
                    dest: '<%= buildPath %>/css',
                    rename: renameRemoveHandlerWebCustomConfig
                }]
            },
            imagesbuiltin: {
                files: [{
                    expand: true,
                    src: "*.*",
                    cwd: "src/images",
                    dest: "<%= buildPath %>/images"
                }, {
                    expand: true,
                    src: "*.*",
                    cwd: "bower_components/blackbaud-skyux/dist/css/images",
                    dest: "<%= buildPath %>/images/sky"
                }, {
                    expand: true,
                    src: ['removehandler.web.config'],
                    cwd: 'src',
                    dest: '<%= buildPath %>/images',
                    rename: renameRemoveHandlerWebConfig
                }]
            },
            imagescustom: {
                files: [{
                    expand: true,
                    src: "*.*",
                    cwd: "src/images",
                    dest: "<%= buildPath %>/images"
                }, {
                    expand: true,
                    src: "*.*",
                    cwd: "bower_components/blackbaud-skyux/dist/css/images",
                    dest: "<%= buildPath %>/images/sky"
                }, {
                    expand: true,
                    src: ['removehandler.web.config'],
                    cwd: 'src',
                    dest: '<%= buildPath %>/images',
                    rename: renameRemoveHandlerWebCustomConfig
                }]
            },
            crmbuiltin: {
                files: [{
                    expand: true,
                    cwd: '<%= buildPath %>',
                    src: ['css/**/*.*', 'images/**/*.*', 'js/**/*.*', 'index.html', 'web.config'],
                    dest: getDestinationFolder(false, 'example')
                }]
            },
            crmcustom: {
                files: [{
                    expand: true,
                    cwd: '<%= buildPath %>',
                    src: ['css/**/*.*', 'images/**/*.*', 'js/**/*.*', 'index.example.html', 'web.custom.config'],
                    dest: getDestinationFolder(true, 'example'),
                    rename: function (dest, src) {
                        switch (src) {
                            case 'web.custom.config':
                                return dest + '/web.config';
                            case 'index.example.html':
                                return dest + '/index.html';
                            default:
                                return dest + '/' + src;
                        }
                    }
                }]
            }
        };
    }

    grunt.initConfig({
        buildPath: grunt.option('buildpath') || 'build',
        bump: {
            options: {
                files: ['bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        // We used to use grunt-contrib-concat here but the source maps never came out right.  This one works much better.
        concat_sourcemap: {
            options: {
                sourcesContent: true
            },
            app: {
                files: {
                    '<%= buildPath %>/js/app.js': [
                        'src/index.js',
                        'src/index.angular.js',
                        'src/modules.js',
                        'src/resources.js',
                        '<%= buildPath %>/js/locales/example-locale-<%= example.defaultLocale %>.js',
                        'src/api/crm.module.js',
                        'src/api/crm.config.js',
                        'src/api/crm.apiPortfolio.js',
                        'src/api/crm.apiProspectView.js',
                        'src/api/crm.apiContactReportOptions.js',
                        'src/api/crm.apiContactReport.js',
                        'src/api/crm.js',
                        'src/**/*.js',
                        'tmp/templates.js'
                    ]
                }
            },
            dependencies: {
                files: {
                    '<%= buildPath %>/js/dependencies-bundle.js': [
                        'src/lib/fallback.js',
                        'src/dependencies.js'
                    ]
                }
            }
            //tests: {
            //    files: {
            //        'test/unittests.js': [
            //            'test/helpers.js',
            //            'test/index.angular.spec.js',
            //            'test/**/*.js',
            //            '!test/unittests.*'
            //        ]
            //    }
            //}
        },
        uglify: {
            options: {
                sourceMap: true
            },
            app: {
                options: {
                    sourceMapIn: '<%= buildPath %>/js/app.js.map'
                },
                src: ['<%= buildPath %>/js/app.js'],
                dest: '<%= buildPath %>/js/app.min.js'
            },
            dependencies: {
                options: {
                    sourceMapIn: '<%= buildPath %>/js/dependencies-bundle.js.map'
                },
                src: ['<%= buildPath %>/js/dependencies-bundle.js'],
                dest: '<%= buildPath %>/js/dependencies-bundle.min.js'
            }
            //tests: {
            //    src: ['test/unittests.js'],
            //    dest: 'test/unittests.min.js'
            //}
        },
        copy: getCopyFiles(),
        sass: {
            app: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= buildPath %>/css/app.css': 'src/scss/app.scss'
                }
            }
        },
        html2js: {
            options: {
                module: 'example.templates',
                quoteChar: '\'',
                indentString: '    ',
                singleModule: true
            },
            main: {
                src: ['src/views/**/*.html', 'src/components/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        jshint: {
            options: {
                jshintrc: true,
                ignores: jsHintExclude
            },
            all: jsHintFiles
        },
        jscs: {
            options: {
                config: '.jscsrc',
                excludeFiles: jsHintExclude
            },
            all: jsHintFiles
        },
        //watch: {
        //    sass: {
        //        files: ['src/scss/*.scss'],
        //        tasks: ['sass']
        //    },
        //    scripts: {
        //        files: ['src/**/*.js'],
        //        tasks: ['concat_sourcemap:app', 'copy:js']
        //    },
        //    html: {
        //        files: ['src/index.html'],
        //        tasks: ['copy:html']
        //    },
        //    templates: {
        //        files: ['src/views/**/*.html'],
        //        tasks: ['html2js', 'concat_sourcemap:app', 'copy:js']
        //    }
        //},
        exec: {
            chutzpah: '"packages/Chutzpah.4.2.3/tools/chutzpah.console.exe" test /coverage /coveragehtml "' +
                testResultsFolder + '/Blackbaud.AppFx.MajorGiving.Mobile.Sky.coverage.html" /coveragejson "' +
                testResultsFolder + '/Blackbaud.AppFx.MajorGiving.Mobile.Sky.coverage.json" /trx "' +
                testResultsFolder + '/Blackbaud.AppFx.MajorGiving.Mobile.Sky.trx"'
        },
        xdt: {
            trx: {
                src: testResultsFolder + '/Blackbaud.AppFx.MajorGiving.Mobile.Sky.trx',
                dest: testResultsFolder + '/Blackbaud.AppFx.MajorGiving.Mobile.Sky.trx',
                options: {
                    transform: "trx.xdt"
                }
            }
        },
        skylint: {
            options: {
                linterUrl: 'https://sky.blackbaudcdn.net/skyux/dev/js/skylint.min.js'
            },
            files: ['src/**/*.html']
        }
    });

    grunt.config.merge({
        example: {
            defaultLocale: 'en-US',
            paths: {
                locales: 'src/locales/',
                src: 'src/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-xdt');
    grunt.loadNpmTasks('grunt-skylint');

    require('./grunt.locale')(grunt, env, utils);

    grunt.registerTask('localize', function () {
        utils.run({
            'l10n': true
        });
    });

    grunt.registerTask("mkdir", function (dirpath, mode) {
        console.log("Creating directory " + dirpath);
        grunt.file.mkdir(dirpath, mode);
    });

    grunt.registerTask("force", function (set) {
        if (set === "on") {
            grunt.option("force", true);
        } else if (set === "off") {
            grunt.option("force", false);
        } else if (set === "restore") {
            grunt.option("force", initialForceState);
        }
    });

    // Make this a separate task. Because we are using the CDN, it may start failing if new checks are added.
    // TODO it would be ideal to host the version that matches the SKY UX version we are using and always check against that.
    // In the meantime, expect developers to run this lint task occasionally.
    grunt.registerTask('bbskylint', ['skylint']);
    grunt.registerTask('default', ['defaultcommon', 'copybuiltin']);
    grunt.registerTask('defaultcommon', ['html2js', 'localize', 'concat_sourcemap:app', 'concat_sourcemap:dependencies',
    'uglify:app', 'uglify:dependencies', 'sass', 'copy:fonts']);
    grunt.registerTask('copybuiltin', ['copy:jsbuiltin', 'copy:htmlbuiltin', 'copy:cssbuiltin', 'copy:imagesbuiltin', 'copy:crmbuiltin']);
    grunt.registerTask('copycustom', ['copy:jscustom', 'copy:htmlcustom', 'copy:csscustom', 'copy:imagescustom', 'copy:crmcustom']);
    if (isDesktopBuild) {
        grunt.registerTask('lint', ['jshint', 'jscs', 'bbskylint']);
        grunt.registerTask('build', ['lint', 'default']);
        grunt.registerTask('buildboth', ['lint', 'default', 'copycustom']);
        grunt.registerTask('buildcustom', ['lint', 'defaultcommon', 'copycustom']);
    } else {
        grunt.registerTask('lint', ['jshint', 'jscs']);
        grunt.registerTask('build', ['default']);
    }
    //grunt.registerTask('visualtest', ['cleanupwebdrivertestfixtures', 'cleanupworkingscreenshots', 'buildwebdrivertestfixtures', 'connect:webdrivertest', 'webdriver:test', 'cleanupwebdrivertestfixtures', 'cleanupworkingscreenshots']);
    //grunt.registerTask('docs', ['stache_jsdoc', 'status:demo/build', 'stache', 'copy:demo']);
    grunt.registerTask('test', ['lint', //'concat_sourcemap:tests', 'uglify:tests',
        "mkdir:" + testResultsFolder, "force:on", "exec:chutzpah", "xdt:trx", "force:restore"/*, 'visualtest', 'docs'*/]);
    grunt.registerTask('buildandtest', ['build', 'test']);
    //grunt.registerTask('watch', ['build', 'karma:watch:start', 'watchNoConflict']);

};
