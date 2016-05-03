'use strict';

var grunto = require('grunto');
var jitGrunt = require('jit-grunt');

module.exports = grunto(function (grunt) {
	jitGrunt(grunt);

	grunt.registerTask('test', [
		'newer:eslint',
		'nodeunit'
	]);

	grunt.registerTask('default', [
		'test',
		'watch'
	]);

	return {
		nodeunit: {
			all: [
				'tests/*.js'
			]
		},
		eslint: {
			all: [
				'**/*.js',
				'!node_modules/**/*',
				'!lib-cov/**/*'
			]
		},
		watch: {
			files: [
				'lib/**/*',
				'tests/**/*'
			],
			tasks: [
				'test'
			]
		}
	};
});
