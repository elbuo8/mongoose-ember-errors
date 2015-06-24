'use strict';

var _ = require('lodash');
var util = require('util');

function DSErrorSerializer(err) {
  Error.call(this);
  Error.captureStackTrace(this, DSErrorSerializer);
  this.message = err.message;
  this.errors = {};
  var self = this;
  Object.keys(err.errors).forEach(function(error) {
    switch (err.errors[error].name) {
      case 'CastError':
        self.buildValidatorError(error, (error.value ? 'is invalid': 'is required'));
        break;
      case 'ValidatorError':
        self.buildValidatorError(error, err.errors[error].message);
        break;
    }
  });
}

util.inherits(DSErrorSerializer, Error);

DSErrorSerializer.prototype.buildValidatorError = function(error, message) {
  var self = this;
  var keys = error.split('.');

  function errorBuilder(keys) {
    var result = {};
    if (!keys[1]) {
      result[keys[0]] = [message];
    } else {
      result[keys[0]] = errorBuilder(keys.slice(1));
    }
    return result;
  }
  if (keys.length > 1) {
    self.errors[keys[0]] = _.merge(self.errors[keys[0]] || {}, errorBuilder(keys.slice(1)));
  } else {
    self.errors[keys[0]] = [message];
  }
};

module.exports = DSErrorSerializer;
