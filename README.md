[![npm](http://img.shields.io/npm/v/async-iterate.svg?style=flat-square)](https://www.npmjs.com/package/async-iterate)
[![npm](http://img.shields.io/npm/l/async-iterate.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-pasynkau/async-iterate.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/async-iterate)
[![devDependency Status](https://david-dm.org/aliaksandr-pasynkau/async-iterate/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/async-iterate#info=devDependencies)
[![Build Status](https://travis-ci.org/aliaksandr-pasynkau/async-iterate.svg?branch=master&style=flat-square)](https://travis-ci.org/aliaksandr-pasynkau/async-iterate)
[![Coverage Status](https://img.shields.io/coveralls/aliaksandr-pasynkau/async-iterate.svg?style=flat-square)](https://coveralls.io/r/aliaksandr-pasynkau/async-iterate?branch=master)

async-iterate
=============

lightweight iterators (reduce, map, each) of collections (array, plain object) with async callbacks

## iterate::each(object, iterator, done)
**object** - array/object for iteration
**iterator** - function(value, key, done)
**done** - function(error)

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.each(object, function (value, key, done) {
	// do something

	done();
}, function (err) {
	// do something
});
```

## iterate::map(object, iterator, done)
**object** - array/object for iteration
**iterator** - function(value, key, done)
**done** - function(error, resultArray)

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.each(object, function (value, key, done) {
	done(null, key);
}, function (err, result) {
	console.log(result); // ["a", "b"]
});
```

## iterate::reduce(object, reduceObject, iterator, done)
**object** - `array/object` for iteration
**reduceObject** - `Mixed`
**iterator** - `function`(reduceObject, value, key, done)
**done** - `function`(error, reduceObject)

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.reduce(object, -1, function (result, value, key, done) {
	done(null, ++result);
}, function (err, result) {
	console.log(result); // 1
});
```
