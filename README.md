# Mongoose Ember Errors

Simple tool to convert Mongoose's `ValidationError` into Ember-Data compatible.

## Install

`npm install mongoose-ember-errors --save`

## Usage

```js
var EmberErrors = require('mongoose-ember-errors');

model.save(function(err) {
  // err contains normal ValidationError
  err = new EmberErrors(err);
});

```

The conversion looks similar to this:

```js
{ [ValidationError: Schema validation failed]
  message: 'Schema validation failed',
  name: 'ValidationError',
  errors:
   { testObjectId:
      { [CastError: Cast to ObjectID failed for value "test" at path "testObjectId"]
        message: 'Cast to ObjectID failed for value "test" at path "testObjectId"',
        name: 'CastError',
        kind: 'ObjectID',
        value: 'test',
        path: 'testObjectId' },
     testField:
      { [ValidatorError: Path `testField` is required.]
        properties: [Object],
        message: 'Path `testField` is required.',
        name: 'ValidatorError',
        kind: 'required',
        path: 'testField',
        value: undefined } } }
```

Into:

```js
{ [Error: Schema validation failed]
  message: 'Schema validation failed',
  errors:
   { testObjectId: [ 'test is invalid' ],
     testField: [ 'Path `testField` is required.' ] } }
```
