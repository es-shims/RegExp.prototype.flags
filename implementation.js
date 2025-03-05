'use strict';

var setFunctionName = require('set-function-name');
var $TypeError = require('es-errors/type');

var $Object = Object;

module.exports = setFunctionName(/** @type {import('./implementation')} */ function flags() {
	if (this == null || this !== $Object(this)) {
		throw new $TypeError('RegExp.prototype.flags getter called on non-object');
	}

	var result = '';
	if (this.hasIndices) {
		result += 'd';
	}
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.dotAll) {
		result += 's';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.unicodeSets) {
		result += 'v';
	}
	if (this.sticky) {
		result += 'y';
	}
	// eslint-disable-next-line no-extra-parens
	return /** @type {ReturnType<flags>} */ (result);
}, 'get flags', true);

