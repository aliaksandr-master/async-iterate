"use strict";

var each = function (obj, iterator, context) {
	if (!obj) {
		return;
	}

	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			iterator.call(context, obj[key], key);
		}
	}
};

var keys = Object.keys || function (obj) {
	var keys = [];

	each(obj, function (v, k) {
		keys.push(k);
	});

	return keys;
};

var isArray = Array.isArray || function (obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

module.exports.keys = keys;
module.exports.each = each;
module.exports.isArray = isArray;
