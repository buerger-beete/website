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
	ignorePatterns: [
		"**/*.md"
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
