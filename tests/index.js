'use strict';

var _ = require('lodash');
var iterate = require('./_lib/index');

var obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, k: 10 };
var arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

module.exports['each: array'] = {
	'nothing to iterate': function (test) {
		var len = 0;
		var arr = [];
		var count = 0;

		iterate.each(arr, function (value, index, done) {
			count++;
			done();
		}, function (err) {
			test.strictEqual(count, len);
			test.done(err);
		});
	},
	'not array': function (test) {
		var len = 0;
		var arr = null;
		var count = 0;

		iterate.each(arr, function (value, index, done) {
			count++;
			done();
		}, function (err) {
			test.strictEqual(count, len);
			test.done(err);
		});
	},
	'across all items of array': function (test) {
		var len = arr.length;
		var keys = _.keys(arr);
		var count = 0;
		var _keys = [];

		iterate.each(arr, function (value, index, done) {
			count++;
			_keys.push(index);
			done();
		}, function (err) {
			test.strictEqual(count, len);
			test.deepEqual(keys, _keys);
			test.done(err);
		});
	},
	'interrupt by error': function (test) {
		var len = arr.length;
		var count = 0;

		iterate.each(arr, function (value, index, done) {
			count++;
			done(count >= len / 2 ? true : null);
		}, function (err) {
			test.strictEqual(count, len / 2);
			test.done(err instanceof Error ? err : null);
		});
	}
};

module.exports['each: object'] = {
	'not object': function (test) {
		var obj = null;
		var len = _.size(obj);
		var count = 0;

		iterate.each(obj, function (value, index, done) {
			count++;
			done();
		}, function (err) {
			test.strictEqual(len, count);
			test.done(err);
		});
	},

	'nothing to iterate': function (test) {
		var obj = {};
		var len = _.size(obj);
		var count = 0;

		iterate.each(obj, function (value, index, done) {
			count++;
			done();
		}, function (err) {
			test.strictEqual(len, count);
			test.done(err);
		});
	},

	'across all items of object': function (test) {
		var len = _.size(obj);
		var count = 0;

		iterate.each(obj, function (value, index, done) {
			count++;
			done();
		}, function (err) {
			test.strictEqual(count, len);
			test.done(err);
		});
	},

	'interrupt by error': function (test) {
		var len = _.size(obj);
		var count = 0;

		iterate.each(obj, function (value, index, done) {
			count++;
			done(count >= (len / 2) ? true : null);
		}, function (err) {
			test.strictEqual(count, len / 2);
			test.done(err instanceof Error ? err : null);
		});
	}
};


// MAP

module.exports['map: array'] = {
	'nothing to iterate': function (test) {
		var len = 0;
		var arr = [];
		var count = 0;

		iterate.map(arr, function (value, index, done) {
			done(null, ++count);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.deepEqual([], result);
			test.done(err);
		});
	},

	'not array': function (test) {
		var len = 0;
		var arr = null;
		var count = 0;

		iterate.map(arr, function (value, index, done) {
			done(null, ++count);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.deepEqual([], result);
			test.done(err);
		});
	},

	'across all items of array': function (test) {
		var len = arr.length;
		var keys = _.keys(arr);
		var count = 0;
		var _keys = [];

		iterate.map(arr, function (value, index, done) {
			_keys.push(index);
			done(null, ++count);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.deepEqual(_.map(arr, function (v, k) {
				return k + 1;
			}), result);
			test.deepEqual(keys, _keys);
			test.done(err);
		});
	},

	'interrupt by error': function (test) {
		var len = arr.length;
		var count = 0;

		iterate.map(arr, function (value, index, done) {
			++count;
			done(count >= len / 2 ? true : null, count);
		}, function (err, result) {
			test.strictEqual(count, len / 2);
			test.deepEqual(_.map(_.range(len / 2), function (v, k) {
				return k + 1;
			}), result);
			test.done(err instanceof Error ? err : null);
		});
	}
};

module.exports['map: object'] = {
	'not object': function (test) {
		var obj = null;
		var len = _.size(obj);
		var count = 0;

		iterate.map(obj, function (value, index, done) {
			done(null, ++count);
		}, function (err, result) {
			test.strictEqual(len, count);
			test.deepEqual([], result);
			test.done(err);
		});
	},

	'nothing to iterate': function (test) {
		var obj = {};
		var len = _.size(obj);
		var count = 0;

		iterate.map(obj, function (value, index, done) {
			done(null, ++count);
		}, function (err, result) {
			test.strictEqual(len, count);
			test.deepEqual([], result);
			test.done(err);
		});
	},

	'across all items of object': function (test) {
		var len = _.size(obj);
		var count = 0;

		iterate.map(obj, function (value, index, done) {
			done(null, ++count);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.deepEqual(_.map(arr, function (v, k) {
				return k + 1;
			}), result);
			test.done(err);
		});
	},

	'interrupt by error': function (test) {
		var len = _.size(obj);
		var count = 0;

		iterate.map(obj, function (value, index, done) {
			++count;
			done(count >= len / 2 ? true : null, count);
		}, function (err, result) {
			test.strictEqual(count, len / 2);
			test.deepEqual(_.map(_.range(len / 2), function (v, k) {
				return k + 1;
			}), result);
			test.done(err instanceof Error ? err : null);
		});
	}
};

// REDUCE

module.exports['reduce: array'] = {
	'nothing to iterate': function (test) {
		var len = 0;
		var arr = [];
		var count = 0;

		iterate.reduce(arr, -1, function (result, value, index, done) {
			++count;
			done(null, ++result);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.strictEqual(count - 1, result);
			test.done(err);
		});
	},

	'not array': function (test) {
		var len = 0;
		var arr = null;
		var count = 0;

		iterate.reduce(arr, -1, function (result, value, index, done) {
			++count;
			done(null, ++result);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.strictEqual(count - 1, result);
			test.done(err);
		});
	},

	'across all items of array': function (test) {
		var len = arr.length;
		var keys = _.keys(arr);
		var count = 0;
		var _keys = [];

		iterate.reduce(arr, -1, function (result, value, index, done) {
			++count;
			_keys.push(index);
			done(null, ++result);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.strictEqual(count - 1, result);
			test.deepEqual(keys, _keys);
			test.done(err);
		});
	},

	'interrupt by error': function (test) {
		var len = arr.length;
		var count = 0;

		iterate.reduce(arr, -1, function (result, value, index, done) {
			++count;
			done(count >= len / 2 ? true : null, ++result);
		}, function (err, result) {
			test.strictEqual(count, len / 2);
			test.strictEqual(count - 1, result);
			test.done(err instanceof Error ? err : null);
		});
	}
};

module.exports['reduce: object'] = {
	'not object': function (test) {
		var obj = null;
		var len = _.size(obj);
		var count = 0;

		iterate.reduce(obj, -1, function (result, value, index, done) {
			++count;
			done(null, ++result);
		}, function (err, result) {
			test.strictEqual(len, count);
			test.strictEqual(count - 1, result);
			test.done(err);
		});
	},

	'nothing to iterate': function (test) {
		var obj = {};
		var len = _.size(obj);
		var count = 0;

		iterate.reduce(obj, -1, function (result, value, index, done) {
			++count;
			done(null, ++result);
		}, function (err, result) {
			test.strictEqual(len, count);
			test.strictEqual(count - 1, result);
			test.done(err);
		});
	},

	'across all items of object': function (test) {
		var len = _.size(obj);
		var count = 0;

		iterate.reduce(obj, -1, function (result, value, index, done) {
			++count;
			done(null, ++result);
		}, function (err, result) {
			test.strictEqual(count, len);
			test.strictEqual(count - 1, result);
			test.done(err);
		});
	},

	'interrupt by error': function (test) {
		var len = _.size(obj);
		var count = 0;

		iterate.reduce(obj, -1, function (result, value, index, done) {
			++count;
			done(count >= len / 2 ? true : null, ++result);
		}, function (err, result) {
			test.strictEqual(count, len / 2);
			test.strictEqual(count - 1, result);
			test.done(err instanceof Error ? err : null);
		});
	}
};
