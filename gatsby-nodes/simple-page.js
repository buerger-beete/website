const path = require("path")


const simplePages = async (createPage, graphql, reporter) => {
	const mdTemplate = path.resolve("src/templates/simple-page/index.tsx")
	const result = await graphql(`
		{
			allFile(
				filter: {
					relativePath: {
						glob: "legal/*.md"
					}
				}
			) {
				edges {
					node {
						relativePath
						relativeDirectory
						childMarkdownRemark {
							frontmatter {
								path
								title
								meta {
									name
									content
								}
							}

							html
						}
					}
				}
			}
		}
	`)

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild("Couldn’t generate pages from markdown files.")
		return
	}

	if (!result.data.allFile.edges.length) {
		reporter.panicOnBuild("Couldn’t find legal pages or equivalent markdown files.")
		return
	}

	result.data.allFile.edges.forEach(({ node }) => {
		createPage({
			path: node.childMarkdownRemark.frontmatter.path,
			component: mdTemplate,
			context: node.childMarkdownRemark,
		})

		console.log(`Created page under ${ node.childMarkdownRemark.frontmatter.path }`)
	})
}

module.exports = simplePages