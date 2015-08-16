'use strict';

var supportsDescriptors = require('define-properties').supportsDescriptors;
var getPolyfill = require('./polyfill');
var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;

module.exports = function shimFlags() {
	if (!supportsDescriptors) {
		throw new TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	var polyfill = getPolyfill();
	var descriptor = gOPD(RegExp.prototype, 'flags');
	if (!descriptor || descriptor.get !== polyfill) {
		defineProperty(RegExp.prototype, 'flags', {
			configurable: true,
			enumerable: false,
			get: polyfill
		});
	}
	return polyfill;
};
