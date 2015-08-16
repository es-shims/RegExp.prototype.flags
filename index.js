'use strict';

var implementation = require('./implementation');

var supportsDescriptors = Object.defineProperty && (function () {
	try {
		var obj = {};
		Object.defineProperty(obj, 'x', { value: obj });
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
}());

var flagsBound = Function.call.bind(implementation);

flagsBound.shim = function flagsShim() {
	if (!supportsDescriptors) {
		throw new TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if (/a/mig.flags !== 'gim') {
		Object.defineProperty(RegExp.prototype, 'flags', {
			configurable: true,
			enumerable: false,
			get: implementation
		});
	}
	return flagsBound;
};

module.exports = flagsBound;
