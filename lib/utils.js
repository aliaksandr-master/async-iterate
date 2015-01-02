"use strict";

var _keys = function (obj) {
	var keys = [];

	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			keys.push(key);
		}
	}

	return keys;
};

var _isArray = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

var keys = Object.keys || _keys;

var isArray = Array.isArray || _isArray;

module.exports.keys = keys;
module.exports._keys = _keys;
module.exports.isArray = isArray;
module.exports._isArray = _isArray;
