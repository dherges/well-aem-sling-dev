/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var path = require('path')
  , JCR_ROOT = 'jcr_root'
  , VAULT_ROOT = JCR_ROOT + path.sep


/**
 * Extracts a path relative from a 'jcr_root' workspace directory
 *
 * @param localpath {String} Path on your disk, e.g. '/home/user/project/xyz/jcr_root/foo/bar/under-the-hood.js'
 * @return {String} Sling content path, e.g. 'foo/bar/under-the-hood.js'
 */
module.exports.extractContentPath = function (localpath) {
  var index = localpath.lastIndexOf(VAULT_ROOT)

  if (index >= 0) {
    return localpath.substring(index + VAULT_ROOT.length)
  }
}

/**
 * Extracts the path to the 'jcr_root' folder
 *
 * @param localpath {String} Path on your disk, e.g. '/home/user/project/xyz/jcr_root/foo/bar/under-the-hood.js'
 * @return {String} Path to the 'jcr_root' folder, e.g. '/home/user/project/xyz/jcr_root'
 */
module.exports.extractJcrRootPath = function (localpath) {
  var index = localpath.lastIndexOf(VAULT_ROOT)

  if (index >= 0) {
    return localpath.substring(0, index + VAULT_ROOT.length - 1)
  }
}



module.exports.resolveContentPath = function (workspacePath, filePath) {
  return path.resolve(workspacePath, filePath)
}
