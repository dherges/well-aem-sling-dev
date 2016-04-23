/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var util = require('./util')
  , jcrRoot = require('./jcr_root')
  , sling = require('./sling')

/**
 * Creates a new Workspace instance that represents a local developer workspace connected to a sling server
 *
 * @param {JcrRoot} jcrRoot  JcrRoot instance
 * @param {Sling} sling  Sling instance
 * @constructor
 */
function Workspace(jcrRoot, sling) {
  this.jcrRoot = jcrRoot
  this.workingDir = jcrRoot.path
  this.sling = sling
}

/**
 * Uploads a file to the server
 *
 * @param {File} file vinyl file object
 * @param {Function} callback callback
 */
Workspace.prototype.uploadFile = function (file, callback) { // TODO .. this should return a promise

  var contentPath = util.resolveContentPath(this.workingDir, file.path)
  this.sling.uploadFile(contentPath, file, callback)
}



/**
 * Creates a new workspace that is located in the given 'dirPath'
 *
 * @param {String} dirPath Path to a workspace directory, e.g. '/home/user/myproject/jcr_root'
 * @param {Object} slingOpts Sling server options
 * @returns {Workspace}
 */
module.exports = function (dirPath, slingOpts) {
  return new Workspace(jcrRoot(dirPath), sling(slingOpts))
}

/**
 * Creates a new workspace for any local file in a 'jcr_root' directory
 *
 * @param {File} file vinyl file object
 * @param {Object} slingOpts Sling server options
 * @returns {Workspace}
 */
module.exports.for = function (file, slingOpts) {
  var mypath = util.extractJcrRootPath(file.path)

  return new Workspace(jcrRoot(mypath), sling(slingOpts))
}

module.exports.Workspace = Workspace
