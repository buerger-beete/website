module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		"plugin:react/recommended",
	],
	settings: {
		react: {
			version: "detect"
		}
	},
	parserOptions: {
		sourceType: "module",
		allowImportExportEverywhere: true,
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: "latest",
	},
	plugins: [
		"react",
	],
	rules: {
		indent: [ "error", "tab" ],
		quotes: [ "error", "double" ],
	},
}
