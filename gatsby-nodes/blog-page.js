const path = require("path")


const blogPages = async (createPage, graphql, reporter) => {
	const mdTemplate = path.resolve("src/templates/blog-page/index.jsx")
	const blogEntriesResult = await graphql(`
		{
			allFile(
				filter: {
					relativePath: {
						glob: "blog/**/*.md"
					}
					childrenMarkdownRemark: {
						elemMatch: {
							frontmatter: {
								published: {
									eq: true
								}
							}
						}
					}
				}
			) {
				edges {
					node {
						relativePath
						relativeDirectory
						childMarkdownRemark {
							frontmatter {
								published
								title
								subtitle
								description
								author
								date
								teaserImg {
									childImageSharp {
										gatsbyImageData(layout: FULL_WIDTH)
									}
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
	if (blogEntriesResult.errors) {
		reporter.panicOnBuild("Couldn’t generate pages from markdown files.")
		return
	}

	if (!blogEntriesResult?.data?.allFile?.edges?.length) {
		console.warn("No blog entries found.")
		return
	}

	for (const { node } of blogEntriesResult.data.allFile.edges) {
		// get last dir name
		const slug = "blog/" + node.relativeDirectory.split("/").reverse()[0]

		createPage({
			path: slug,
			component: mdTemplate,
			context: node.childMarkdownRemark
		})

		console.log(`Created page under ${ slug }`)
	}
}

module.exports = blogPages