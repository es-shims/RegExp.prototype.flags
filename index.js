'use strict';

var flagsGetter = function flags() {
	var str = String(this);
	return str.slice(str.lastIndexOf('/') + 1);
};

var supportsDescriptors = (function () {
	if (!Object.defineProperty) {
		return false;
	}
	try {
		Object.defineProperty({}, 'x', {});
		return true;
	} catch (e) { /* this is IE 8. */
		return false;
	}
}());

var flags = Function.call.bind(flagsGetter);

flags.shim = function flagsShim() {
	if (!supportsDescriptors) {
		throw new TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if (/a/mig.flags !== 'gim') {
		Object.defineProperty(RegExp.prototype, 'flags', {
			configurable: true,
			enumerable: false,
			get: flagsGetter
		});
	}
	return flags;
};

module.exports = flags;
