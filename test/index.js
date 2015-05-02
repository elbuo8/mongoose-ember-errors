'use strict';

var assert = require('assert');
var EmberError = require('./../');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

describe('DSErrorSerializer', function() {
  var Model;
  before(function() {
    var testSchema = new Schema({
      testObjectId: {type: Schema.Types.ObjectId},
      testField: {type: String, required: true}
    });
    Model = mongoose.model('Schema', testSchema);
  });
  it('should convert a mongoose validation error into an ember-data one', function(done) {
    var test = new Model({
      testObjectId: 'test'
    });
    test.save(function(err) {
      assert(err);
      err = new EmberError(err);
      assert(err.errors.testObjectId);
      assert(err.errors.testField);
      done();
    });
  });
});
