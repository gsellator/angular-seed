module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        clean: ["pkg/"],

        env : {
            local: {
                NODE_ENV : 'LOCAL'
            },
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            pre : {
                NODE_ENV : 'PREPRODUCTION'   
            },
            prod : {
                NODE_ENV : 'PRODUCTION'   
            }
        },

        bump: {
            options: {
                commit: false,
                createTag: false,
                push: false
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'client/', src: [
                        'views/**',
                        'favicon.*',
                        'js/lib/require.js',
                        'js/routes.js',
                        'js/bower_components/d3/d3.js',
                    ], dest: 'pkg/client/'},
                        {src: ['package.json', 'server/**'], dest: 'pkg/'}
                ]
            }
        }, 

        preprocess : {
            main : {
                src : 'index-master.html',
                dest : 'pkg/client/index.html',
                options : {
                    context : {
                        name : '<%= pkg.name %>',
                        version : '<%= pkg.version %>'
                    } 
                }
            },
            local : {
                src : 'client/index-master.html',
                dest : 'client/index.html',
            }
        },

        imagemin: {
            quick: {
                files: [{
                    expand: true,
                    cwd: 'client/',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'pkg/client/'
                }]
            },
            full: {
                files: [{
                    expand: true,
                    cwd: 'client/',
                    src: ['img/**/*.{png,jpg,gif}'],
                    dest: 'pkg/client/'
                }]
            }
        },

        cssmin: {
            combine: {
                files: {
                    'pkg/client/css/<%= pkg.name %>.<%= pkg.version %>.min.css': [
                        'client/css/style.css'
                    ]
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    name: "app",
                    baseUrl: "client/js/",
                    mainConfigFile: "client/js/config.js",
                    out: "pkg/client/js/<%= pkg.name %>.<%= pkg.version %>.min.js",
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    uglify: {
                        no_mangle: true
                    }
                }
            }
        },

        'sftp-deploy': {
            prod: {
                auth: {
                    host: 'delirium.cloudapp.net',
                    port: 22,
                    authKey: 'prod'
                },
                src: 'pkg',
                dest: '/home/9h00-prod/9h00',
                exclusions: ['pkg/client/files/*'],
                server_sep: '/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.registerTask('local', ['env:local', 'preprocess:local']);
    grunt.registerTask('prod', ['clean', 'bump', 'env:prod', 'copy:main', 'preprocess:main', 'imagemin:full', 'cssmin', 'requirejs', 'sftp-deploy:prod']);
};
