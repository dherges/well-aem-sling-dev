/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/aem-sling-dev-well
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var fs = require('fs')
  , request = require('request')


function Sling(remote, user, pass) {
  this.remote = remote
  this.user = user
  this.pass = pass
}


Sling.prototype.post = function (path, data, cb) {

  var r = request.post(
    this.remote + path,
    {
      auth: {
        user: this.user,
        pass: this.pass
      }
    },
    function (err, httpResponse) {
      if (err) {
        cb(err)
      }

      if (httpResponse) {
        cb(httpResponse)
      }
    }
  )

  var form = r.form()
  for (var key in data) {
    if (formData.hasOwnProperty(key)) {
      form.append(key, data[key])
    }
  }
}

Sling.prototype.postFile = function (remotePath, filePath, callback) {
  var data = {
    '_charset_': 'utf-8',
    '*': fs.createReadStream(filePath)
  }

  if (remotePath.indexOf('/install', remotePath.length - '/install'.length) !== -1) {
    // in that case we ensure node type is fulfilled in case the folder needs to be created
    data['jcr:primaryType'] = 'nt:folder';
  }

  this.post(remotePath, data, callback)
}



module.exports.Sling = Sling
