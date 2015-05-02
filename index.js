'use strict';

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
        self.errors[error] = [err.errors[error].value + ' is invalid'];
        break;
      case 'ValidatorError':
        self.errors[error] = [err.errors[error].message];
        break;
    }
  });
}

util.inherits(DSErrorSerializer, Error);

module.exports = DSErrorSerializer;
