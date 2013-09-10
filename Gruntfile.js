'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON( 'package.json' ),
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    concat : {
      options : {
      
        banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                 '<%= grunt.template.today("dd-mm-yyyy") %> */',
        stripBanners : true,
        separator : ';'

      },
      build : {
        src : [
            'DataTables/media/js/jquery.js',
            'DataTables/media/js/jquery.dataTables.js',
            'swipebox/lib/ios-orientationchange-fix.js',
            'swipebox/lib/jquery.isotope.min.js',
            'underscore/underscore-min.js'
          ],
        dest : 'build/jquery.bundled.min.js'
      }
    },
    uglify : {
    
      build : {
        files : {
          'build/jquery.ugly.bundled.min.js' : [ 'build/jquery.bundled.min.js' ]
        },
        options : {
          mangle : false
        }
      }

    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('build', ['concat:build', 'uglify:build']);

};
