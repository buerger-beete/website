const getImagesByPath = async (node, graphql, reporter) => {
	const teaserImages = await graphql(`
		{
			allFile (
				filter: {
					relativePath: {
						glob: "${ path }"
					}
				}
			) {
				nodes {
					id
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
			}
		}
	`)

	if (teaserImages?.errors) {
		reporter.panicOnBuild("Couldn’t generate blog pages.", teaserImages?.errors)
		return
	}

	return teaserImages.allFile.nodes
}

module.exports = { getImagesByPath }