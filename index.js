'use strict';

var flagsGetter = function flags() {
	if (this != null && this !== Object(this)) {
		throw new TypeError('RegExp.prototype.flags getter called on non-object');
	}
	var result = '';
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.sticky) {
		result += 'y';
	}
	return result;
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
