/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/well-aem-sling-dev
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
 * @param {String} localpath Path on your disk, e.g. '/home/user/project/xyz/jcr_root/foo/bar/under-the-hood.js'
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
 * @param {String} localpath Path on your disk, e.g. '/home/user/project/xyz/jcr_root/foo/bar/under-the-hood.js'
 * @return {String} Path to the 'jcr_root' folder, e.g. '/home/user/project/xyz/jcr_root'
 */
module.exports.extractJcrRootPath = function (localpath) {
  var index = localpath.lastIndexOf(VAULT_ROOT)

  if (index >= 0) {
    return localpath.substring(0, index + VAULT_ROOT.length - 1)
  }
}

/**
 * Resolves a path relative from 'workspacePath' to 'filePath'
 *
 * @param {String} workspacePath Path on your disk to a workspace directory, e.g. '/home/user/project/xyz/jcr_root'
 * @param {String} filePath Path on your disk to a file in that workspace directory, e.g. '/home/user/project/xyz/jcr_root/foo/bar.txt'
 * @return {String} Relative path, e.g. 'foo/bar.txt', or a falsy value
 */
module.exports.resolveContentPath = function (workspacePath, filePath) {
  var val = path.relative(workspacePath, filePath)
  if (val.startsWith('.')) {
    return false
  } else {
    return val
  }
}
