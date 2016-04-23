/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var Gaze = require('gaze').Gaze
  , SlyDomain = require('../sly/node/SlyDomain')


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var defOpts = {
    sling: {
        remote: 'http://localhost:4502'
      , user: 'admin'
      , pass: 'admin'
    }
    , watch: {
      pattern: '**/*'
    }
  }


  var slingWatch = function () {
    var done = this.async()

    var options = this.options(defOpts)

    new Gaze(options.watch.pattern, {}, function (err, watcher) {
      // On changed/added/deleted
      this.on('all', function(status, filepath) {
        grunt.log.debug('File changed:' + filepath)

        SlyDomain.setRemote(options.sling.remote, options.sling.user, options.sling.pass)
        grunt.log.debug(options.sling)

        var remotePath = SlyDomain.extractRemotePath(filepath)
        grunt.log.debug('Remote path: ' + remotePath)

        SlyDomain.postFile(remotePath, filepath, function (msg) {
          // happy days ... a string message is coming back :-)
          grunt.log.writeln(msg)
        })

      })
    })
  }



  var slingPost = function () {
    var done = this.async()
      , options = this.options(defOpts)

    SlyDomain.setRemote(options.sling.remote, options.sling.user, options.sling.pass)

    this.files.forEach(function(file) {
      var f = file.src.filter(function(filepath) {
        // Remove nonexistent files (it's up to you to filter or warn here).
        if (grunt.file.exists(filepath)) {
          return true
        } else {
          grunt.log.warn('Source file "' + filepath + '" not found.')
          return false
        }
      })

      var cnt = f.length

      f.forEach(function (filepath) {
        var remotePath = SlyDomain.extractRemotePath(filepath)
        grunt.log.debug('Remote path: ' + remotePath)
        SlyDomain.postFile(remotePath, filepath, function (msg) {
          cnt -= 1
          grunt.log.writeln(msg)

          if (cnt === 0) {
            grunt.log.oklns('All files posted.')
            done()
          }
        })
      })

    })
  }


  grunt.registerMultiTask('sling'
    , 'Post files to a sling instance'
    , slingPost
  )

  grunt.registerMultiTask('slingWatch'
    , 'Start watching for changes to files on your local dev workspace'
    , slingWatch
  )

}
