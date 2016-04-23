// run other test cases first
require('./lib/util')


// specs for the main module.js
var assert = require('chai').assert
  , expect = require('chai').expect
  , should = require('chai').should()

describe('index.js', function () {
  var index = require('../../index')

  it('should export util module', function () {
    expect(index.util).to.be.defined
  })

  it('should export workspace module', function () {
    expect(index.workspace).to.be.defined
  })

  it('should export sling module', function () {
    expect(index.sling).to.be.defined
  })

})
