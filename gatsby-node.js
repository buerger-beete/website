const path = require("path")
const simplePages = require("./gatsby-nodes/simple-page")
const blogPages = require("./gatsby-nodes/blog-page")

exports.createPages = async ({
	actions: {
		createPage
	},
	graphql,
	reporter
} ) => {
	await simplePages(createPage, graphql, reporter)
	await blogPages(createPage, graphql, reporter)
}