/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sling: {
      target: {
        src: ['test/jcr_root/**/*.js', 'test/jcr_root/**/*.css']
      }
    },

    slingWatch: {
      author: {
        pattern: "**/*.js, **/*.css"
      }
    }
  })


  grunt.loadTasks('grunt')

  // Default task(s).
  grunt.registerTask('default', [])

}
