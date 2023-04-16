module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true
	},
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	],
	ignorePatterns: [
		"**/*.md"
	],
	settings: {
		react: {
			version: "detect"
		},
		"import/resolver": {
			"alias": [
				[ "@", "./src" ]
			]
		}
	},
	parserOptions: {
		allowImportExportEverywhere: true,
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		"@typescript-eslint",
		"react",
		"prettier"
	],
	rules: {
		indent: [ "error", "tab" ],
		quotes: [ "error", "double" ],
		"react/react-in-jsx-scope": 0,
		"no-irregular-whitespace": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"react/jsx-curly-brace-presence": [
			"error",
			{ props: "always", children: "never" }
		],
		"object-curly-spacing": [ "error", "always" ]
	}
}
