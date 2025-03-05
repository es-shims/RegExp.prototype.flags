'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();
var functionsHaveConfigurableNames = require('functions-have-names').functionsHaveConfigurableNames();
var hasStrictMode = require('has-strict-mode')();

var runTests = require('./tests');

test('shimmed', function (t) {
	var descriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');

	// @ts-expect-error
	t.equal(descriptor.get.length, 0, 'RegExp#flags getter has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		// @ts-expect-error
		st.equal(descriptor.get.name, functionsHaveConfigurableNames ? 'get flags' : 'flags', 'RegExp#flags getter has name "get flags" (or "flags" if function names are not configurable)');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(RegExp.prototype, 'flags'), 'RegExp#flags is not enumerable');
		et.end();
	});

	t.test('bad array/this value', { skip: !hasStrictMode }, function (st) {
		// @ts-expect-error
		st['throws'](function () { return descriptor.get.call(undefined); }, TypeError, 'undefined is not an object');
		// @ts-expect-error
		st['throws'](function () { return descriptor.get.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	t.test('has the correct descriptor', function (st) {
		// @ts-expect-error
		st.equal(descriptor.configurable, true);
		// @ts-expect-error
		st.equal(descriptor.enumerable, false);
		// @ts-expect-error
		st.equal(typeof descriptor.get, 'function');
		// @ts-expect-error
		st.equal(descriptor.set, undefined);
		st.end();
	});

	// @ts-expect-error
	runTests(callBind(descriptor.get), t);

	t.end();
});
