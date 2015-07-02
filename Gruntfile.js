//inject the grunt object
module.exports = function(grunt) {
    // configure your third-party tasks
  grunt.initConfig({
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    //configure the Nodemon Grunt task
    nodemon: {
      dev: {
        script: 'server.js',    //used to define the main script file
        options: {
        //   ext: 'js,html',   /watch both the HTML and JavaScript files that are placed
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      }
    },
    mochaTest: {
      src: 'app/tests/**/*.js',
      options: {
        reporter: 'spec'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    protractor: {
      e2e: {
        options: {
          configFile: 'protractor.conf.js'
        }
      }
    },
    jshint: {
      all: {
        src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js']
      }
    },
    csslint: {
      all: {
        src: 'public/modules/**/*.css'
      }
    },
    watch: {
      js: {
        files: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: 'public/modules/**/*.css',
        tasks: ['csslint']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

//call this method for any new third-party task you add
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.registerTask('default', ['env:dev', 'nodemon']);
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma', 'protractor']);
  grunt.registerTask('lint', ['jshint', 'csslint']);
};