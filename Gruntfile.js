'use strict';

module.exports = function(grunt) {

	//setup grunt configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				configFile: './test/karma.unit.conf.js',
				singleRun: true
			},
			unit_auto: {
				configFile: './test/karma.unit.conf.js',
				singleRun: false,
				background: true
			},
			unit_coverage: {
				configFile: './test/karma.unit.conf.js',
				singleRun: true,
				reporters: ['progress', 'coverage'],
				preprocessors: {
			    	'./client/js/services/!(config).js' : 'coverage',
			    	'./client/js/*.js' : 'coverage',
			    	'./client/js/**/*.js' : 'coverage'
			    },
			    coverageReporter: {
			    	type: 'html',
			    	dir: './bin/coverage/'
			    },
			    exclude: ['./client/js/services/config.js']
			},
			e2e: {
				configFile: './test/karma.e2e.conf.js',
				singleRun: true,
				reporters: ['dots']
			}
		},
		jasmine_node: {
			matchall: false,
			projectRoot: './test/server',
			requirejs: false,
			forceExit: true,
			color: true
		},
		watch: {
			karma: {
				files: [
					'./client/**/*.js',
					'./test/unit/**/*test.js'
				],
				tasks: ['karma:unit_auto:run']
			}
		},
		open: {
			phantom_coverage: {
				path: './bin/coverage/PhantomJS 1.9.7 (Mac OS X)/index.html'
			}
		},
		sync: {
			all: {
				options: {
					//sync specific options
					sync: ['name', 'version', 'author', 'private', 'description'],
					from: './package.json',
					to: './bower.json'
				}
			}
		}
	});

	//load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-npm2bower-sync');

	//define grunt tasks
	grunt.registerTask('test', ['karma:unit_auto', 'watch']);
	grunt.registerTask('test:unit:coverage', ['karma:unit_coverage', 'open:phantom_coverage']);
	grunt.registerTask('test:client', ['karma:unit_coverage', 'karma:e2e', 'open:phantom_coverage']);
	grunt.registerTask('test:server', 'jasmine_node');
	grunt.registerTask('test:all', ['test:server', 'test:client']);

	grunt.registerTask('server', function() {
		var server = require('./server.js');
		this.async();
	});

	grunt.registerTask('default', ['sync','server']);
};