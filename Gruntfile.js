/* global module */
module.exports = function (grunt) {
	var oPackage = grunt.file.readJSON("package.json");

	grunt.config.init({
		"babel": {
			options: oPackage.babel,
			stage: {
				files: [{
					expand: true,
					cwd: "src",
					src: "**/*.js",
					dest: "stage/src/"
				}, {
					expand: true,
					cwd: "test",
					src: "**/*.js",
					dest: "stage/test/"
				}]
			}
		},
		"clean": {
			stage: ["stage"],
			dist: ["dist"],
			pages: ["pages"]
		},
		"compress": {
			pages: {
				options: {
					archive: "pages/spet-ui5-demo.zip"
				},
				files: [{
					expand: true,
					dot: true,
					cwd: "dist/",
					src: "**/*"
				}]
			}
		},
		"openui5_preload": {
			dist: {
				options: {
					resources: {
						cwd: "stage/src/"
					},
					dest: "dist/",
				},
				libraries: true
			}
		},
		"uglify": {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: "stage/src",
					src: "**/*.js",
					dest: "dist/"
				}]
			}
		},
		"copy": {
			stage: {
				files: [{
					expand: true,
					dot: true,
					cwd: "src",
					src: ["**/*.*", "!**/*.js"],
					dest: "stage/src/"
				}, {
					expand: true,
					dot: true,
					cwd: "test",
					src: ["**/*.*", "!**/*.js"],
					dest: "stage/test/"
				}]
			},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: "stage/src",
					src: ["**/*"],
					dest: "dist/",
					rename: function (dest, src) {
						if (src.endsWith(".js")) {
							return dest + src.replace(".js", "-dbg.js");
						} else {
							return dest + src;
						}
					}
				}, {
					src: "README.md",
					dest: "dist/README.md"
				}, {
					src: "LICENSE",
					dest: "dist/LICENSE"
				}]
			},
			pages: {
				files: [{
					expand: true,
					dot: true,
					cwd: "docs",
					src: ["**/*.*"],
					dest: "pages/docs/"
				}]
			}
		},
		"qunit": {
			options: {
				"--web-security": false,
				"--local-to-remote-url-access": true
			},
			all: ["stage/test/**/*.qunit.html"]
		},
		"jsdoc": {
			pages: {
				src: ["src/**/*.js", "README.md"],
				options: {
					destination: "pages/jsdoc/",
					template: "node_modules/ink-docstrap/template",
					configure: ".jsdoc.json"
				}
			}
		},
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-openui5");
	grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-jsdoc");

	grunt.registerTask("stage", ["clean:stage", "babel:stage", "copy:stage"]);
	grunt.registerTask("test", ["qunit"]);
	grunt.registerTask("dist", ["clean:dist", "uglify:dist", "copy:dist", "openui5_preload:dist"]);
	grunt.registerTask("pages", ["clean:pages", "copy:pages", "compress:pages", "jsdoc:pages"]);
	grunt.registerTask("default", ["stage", "test", "dist", "pages"]);
};