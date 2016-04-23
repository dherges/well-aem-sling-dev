/*******************************************************************************
 * Copyright (c) 2016 David Herges. https://github.com/dherges/well-aem-sling-dev
 *
 * Licensed under the Apache License 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 ******************************************************************************/

var assert = require('chai').assert
  , expect = require('chai').expect
  , should = require('chai').should()
  , util = require('../../../lib/util')


describe('util', function() {

  describe('.extractContentPath()', function () {
    it('should return path relative to "jcr_root"', function () {
      expect(util.extractContentPath('jcr_root/tmp/blubbfile.js')).to.equal('tmp/blubbfile.js')
    })

    it('should return path relative to "jcr_root" for absolute paths', function () {
      expect(util.extractContentPath('/abspath/jcr_root/tmp/blubbfile.js')).to.equal('tmp/blubbfile.js')
    })

    it('should return falsy if no "jcr_root" found', function () {
      expect(util.extractContentPath('fooo')).to.be.undefined
    })
  })



  describe('.extractJcrRootPath()', function () {
    it('should return path relative to "jcr_root"', function () {
      expect(util.extractJcrRootPath('jcr_root/tmp/blubbfile.js')).to.equal('jcr_root')
    })

    it('should return path relative to "jcr_root" for absolute paths', function () {
      expect(util.extractJcrRootPath('/abspath/jcr_root/tmp/blubbfile.js')).to.equal('/abspath/jcr_root')
    })

    it('should return falsy if no "jcr_root" found', function () {
      expect(util.extractJcrRootPath('fooo')).to.be.undefined
    })
  })


  describe('.resolveContentPath()', function () {
    it('should resolve a path relative to "jcr_root"', function () {
      expect(util.resolveContentPath('jcr_root', 'jcr_root/tmp/blubbfile.js')).to.equal('tmp/blubbfile.js')
    })

    it('should resolve a path relative to "jcr_root" for absolute paths', function () {
      expect(util.resolveContentPath('/abspath/jcr_root/', '/abspath/jcr_root/tmp/blubbfile.js')).to.equal('tmp/blubbfile.js')
    })

    it('should return falsy if no "jcr_root" found', function () {
      expect(util.resolveContentPath('fooo', 'bar')).to.be.false
    })
  })

})
