'use strict';

var utils = require('./_lib/utils');

exports['is array'] = {
	'valid': function (test) {
		test.ok(utils._isArray([]));
		test.strictEqual(utils._isArray([]), utils.isArray([]));
		test.done();
	},

	'invalid': function (test) {
		test.ok(!utils._isArray({}));
		test.strictEqual(utils._isArray({}), utils.isArray({}));
		test.done();
	}
};

exports.keys = {
	'array': function (test) {
		test.deepEqual(utils._keys([ 1, 2, 3 ]), [ 0, 1, 2 ]);
		test.deepEqual(utils._keys([ 1, 2, 3 ]), utils.keys([ 1, 2, 3 ]));
		test.done();
	},

	'empty array': function (test) {
		test.deepEqual(utils._keys([]), []);
		test.deepEqual(utils._keys([]), utils.keys([]));
		test.done();
	},

	'object': function (test) {
		test.deepEqual(utils._keys({ a: 1, b: 2 }), [ 'a', 'b' ]);
		test.deepEqual(utils._keys({ a: 1, b: 2 }), utils.keys({ a: 1, b: 2 }));
		test.done();
	},

	'empty object': function (test) {
		test.deepEqual(utils._keys({}), []);
		test.deepEqual(utils._keys({}), utils.keys({}));
		test.done();
	}
};
