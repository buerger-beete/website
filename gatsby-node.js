const path = require('path')


exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;
	const mdTemplate = path.resolve(`src/templates/simple-page/index.jsx`);
	const result = await graphql(`
		{
			allMarkdownRemark (filter: { 
				fileAbsolutePath: { 
					regex: "//content/markdown-pages/[^/]+\\\\.md/" 
					} 
				} 
			) {
				edges {
					node {
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
	`);

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild(`Couldn’t generate pages from markdown files.`);
		return;
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.path,
			component: mdTemplate,
			context: node
		});
	});
};