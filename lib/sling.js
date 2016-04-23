/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var request = require('request')
  , urllib = require('urllib')
  , formstream = require('formstream')
  , path = require('path')

var defOpts = {
  url: 'http://localhost:4502/'
, user: 'admin'
, pass: 'admin'
}


/**
 * Creates a new Sling instance that represents a running sling server
 *
 * @link https://sling.apache.org/documentation/bundles/manipulating-content-the-slingpostservlet-servlets-post.html
 *
 * @param {Object} opts Keys (default value): 'url' (http://localhost:4502/), 'user' (admin), 'pass' (admin)
 * @constructor
 */
function Sling(opts) {
  opts = opts || {}
  this.url = opts.url || defOpts.url
  this.url = this.url.endsWith('/') ? this.url : this.url + '/'
  this.user = opts.user || defOpts.user
  this.pass = opts.pass || defOpts.pass
}


/**
 * Uploads a file to sling ... XXXX .. right now not wirking because of ResponseTimeoutError wth?!?
 *
 * @param {String} contentPath  Path in sling content repository
 * @param {File} file           Vinyl file object
 * @param {function} callback   Invoked with 'err, data, res' and all that info from HTTP (you never really wanted to know)
 */
Sling.prototype.uploadFile = function (contentPath, file, callback) {
  var form = formstream()
    .field('_charset_', 'utf-8')
    .field('*@TypeHint', 'nt:file')
    .file('*', file.path)

  this.formPost(contentPath, form, callback)
}


/**
 * Uploads a file to sling ... XXXX .. right now not wirking because of ResponseTimeoutError wth?!?
 *
 * @param {String} contentPath  Path in sling content repository
 * @param {formstream} contentStream  {@link https://nodejs.org/api/stream.html#stream_class_stream_readable}
 * @param {function} callback Invoked with 'err, data, res' and all that info from HTTP (you never really wanted to know)
 */
Sling.prototype.uploadStream = function (contentPath, contentStream, callback) {
  var form = formstream()
    .field('_charset_', 'utf-8')
    .field('*@TypeHint', 'nt:file')
    .stream('*', contentStream, path.basename(contentPath))

  this.formPost(contentPath, form, callback)
}


/**
 * POSTs a form to sling
 *
 * @param {String} contentPath Path in sling content repository
 * @param {formstream} form formstream instance {@link https://www.npmjs.com/package/formstream}
 * @param {function} callback Invoked with 'err, data, res' and all that info from HTTP (you never really wanted to know)
 */
Sling.prototype.formPost = function (contentPath, form, callback) {
  urllib.request(this.remote + contentPath, {
    method: 'POST',
    auth: this.user + ':' + this.pass,
    headers: form.headers(),
    stream: form
  }, callback)
}




module.exports = function (options) {
  return new Sling(options)
}

module.exports.Sling = Sling
