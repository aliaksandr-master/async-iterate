"use strict";

var _ = require('./utils');


/**
 * @callback eachCallback
 * @param {?Error} error - for interrupt of iterate stream
 * */


/**
 * @callback reduceCallback
 * @param {?Error} error - for interrupt of iterate stream
 * @param {Array|Object} error - for interrupt of iterate stream
 * */


/**
 * @callback iterator
 * @param {*} value
 * @param {String} key
 * @param {eachCallback} done
 * */


/**
 * @callback reduceIterator
 * @param {*} result
 * @param {*} value
 * @param {String} key
 * @param {reduceIteratorCallback} done
 * */


/**
 * @callback reduceIteratorCallback
 * @param {?Error} error
 * @param {*} value
 * */


/**
 * iterate of array with async callback function
 *
 * @param {?Array} array - array for iteration
 * @param {!iterator} iterator - function for iterator
 * @param {!eachCallback} done - constructor of child class.
 */
var asyncEachArray = function (array, iterator, done) {
	if (!array || !array.length) {
		done();
		return;
	}

	var lastIndex = array.length;
	var iterate = function (index) {
		if (index === lastIndex) {
			return done();
		}

		iterator(array[index], index, function (err) {
			if (err) {
				return done(err);
			}

			iterate(++index);
		});
	};

	iterate(0);
};


/**
 * iterate of object with async callback function
 *
 * @param {Array|Object} obj - object for iteration
 * @param {!iterator} iterator - function for iterator
 * @param {!eachCallback} done - constructor of child class.
 */
var asyncEach = function (obj, iterator, done) {
	if (_.isArray(obj)) {
		asyncEachArray(obj, iterator, done);
		return;
	}

	asyncEachArray(obj && _.keys(obj), function (key, index, done) {
		iterator(obj[key], key, done);
	}, done);
};


/**
 * reduce object with async callback function
 *
 * @param {Array|Object} obj - object for iteration
 * @param {Array|Object} result - function for iterator
 * @param {!reduceIterator} iterator - function for iterator
 * @param {!reduceCallback} done - constructor of child class.
 */
var asyncReduce = function (obj, result, iterator, done) {
	asyncEach(obj, function (v, k, done) {
		iterator(result, v, k, function (err, value) {
			result = value;
			done(err);
		});
	}, function (err) {
		done(err, result);
	});
};


/**
 * map of objects with async callback function
 *
 * @param {Array|Object} obj - object for iteration
 * @param {!reduceIteratorCallback} iterator - function for iterator
 * @param {!reduceCallback} done - constructor of child class.
 */
var asyncMap = function (obj, iterator, done) {
	asyncReduce(obj, [], function (resultObject, v, k, done) {
		iterator(v, k, function (err, result) {
			resultObject.push(result);
			done(err, resultObject);
		});
	}, done);
};


module.exports.map    = asyncMap;
module.exports.each   = asyncEach;
module.exports.reduce = asyncReduce;
