module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'import/no-unresolved': [2, { commonjs: true, amd: true }],
		'import/named': 2,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal'],
				pathGroups: [
					{
						pattern: 'react',
						group: 'external',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['react'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
	},
};
