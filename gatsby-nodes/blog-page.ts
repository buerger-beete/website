import { CreatePagesArgs } from "gatsby"
import path from "path"


const blogPages = async ({ actions, graphql, reporter }: CreatePagesArgs & {
	traceId: "initial-createPages"
}) => {
	const { createPage } = actions
	const mdTemplate = path.resolve("src/templates/blog-page/index.tsx")
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
								isExternal: {
									eq: false
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
								isExternal
								disableButton
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

	// @ts-ignore
	if (!blogEntriesResult?.data?.allFile?.edges?.length) {
		console.warn("No blog entries found.")
		return
	}

	// @ts-ignore
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

export default blogPages