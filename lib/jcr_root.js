/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var path = require('path')
  , JCR_ROOT = 'jcr_root'
  , VAULT_ROOT = path.sep + JCR_ROOT + path.sep


/**
 * Creates a new JcrRoot instance that represents a local workspace in a 'jcr_root' directory
 *
 * @param path Path on your disk to 'jcr'root' directory, e.g. '/home/user/project/xyz/jcr_root'
 * @constructor
 */
function JcrRoot(path) {
  this.path = path
}


module.exports = function (path) {
  return new JcrRoot(path)
}
module.exports.JcrRoot = JcrRoot
