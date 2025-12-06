import ljharb from '@ljharb/eslint-config/flat';

export default [
	...ljharb,
	{
		rules: {
			eqeqeq: ['error', 'allow-null'],
			'id-length': 'off',
			'no-invalid-this': 'off',
		},
	},
];
