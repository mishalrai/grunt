
const sass = require('node-sass');

const SRC_PATH = './assets/src';
const BUILD_PATH = './assets/build';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Compile Scss files
        sass: {
            options: {
                implementation: sass,
                sourceMap: false,
                style: 'compact'
            },
            dist: {
                files: {
                    [`${BUILD_PATH}/css/style.css`]: `${SRC_PATH}/scss/style.scss`
                }
            }
        },

        //Concat files
        concat: {
            js: {
                src: [
                    `${SRC_PATH}/js/modules/test.module.js`,
                    `${SRC_PATH}/js/main.js`
                ],
                dest: `${BUILD_PATH}/js/script.js`
            }
        },

        //Copy
        copy: {
            vendor: {
                expand: true,
                cwd: SRC_PATH + '/vendor/',
                src: '**',
                dest: BUILD_PATH + '/vendor/',
                filter: 'isFile'
            },
            img: {
                    expand: true,
                    cwd: SRC_PATH + '/img/',
                    src: '**',
                    dest: BUILD_PATH + '/img/',
                    filter: 'isFile'
            },
            front:{
                expand: true,
                cwd: SRC_PATH + '/fonts/',
                src: '**',
                dest: BUILD_PATH + '/fonts/',
                filter: 'isFile'
            }
        },

        //Auto prefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
            },
            target: {
                expand: true,
                flatten: true,
                src: BUILD_PATH + 'css/*.css',
                dest: BUILD_PATH + 'css/'
            }
        },


        //Minify Files
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                src: [`${BUILD_PATH}/css/style.css`],
                dest: `${BUILD_PATH}/css/style.min.css`
            }

        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                src: [`${BUILD_PATH}/js/script.js`],
                dest: `${BUILD_PATH}/js/script.min.js`
            }
        },


        // Watch Files
        watch: {
            css: {
                files: [
                    SRC_PATH + '/scss/**/*.scss',
                    SRC_PATH + '/scss/*.scss',
                    SRC_PATH + '/scss/**/**/*.scss',
                    SRC_PATH + '/scss/**/**/**/*.scss',
                ],
                tasks: ['sass', 'autoprefixer']
            },
            staticFiles: {
                files: [
                    SRC_PATH + '/fonts/*',
                    SRC_PATH + '/img/*',
                    SRC_PATH + '/vendor/*',
                ],
                tasks: ['copy'],
            },
            js: {
                files: [
                    SRC_PATH + '/js/**/*.js',
                    SRC_PATH + '/js/**/**/*.js',
                    SRC_PATH + '/js/**/**/**/*.js',
                ],
                tasks: ['concat']
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['sass', 'concat', 'copy', 'autoprefixer', 'watch']);
    grunt.registerTask('build', ['sass', 'concat', 'copy', 'autoprefixer', 'uglify', 'cssmin']);

};
