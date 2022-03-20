import { graphql } from "gatsby"
import React, {useMemo} from "react"

import Layout from "../components/base/layout/Layout"
import Map from "../components/base/sections/map/Map"
import SEO from "../components/base/seo/SEO"
import Header from "../components/ui/molecule/header/Header"

import News from "../components/base/sections/news/News"
import About from "../components/base/sections/about/About"
import Join from "../components/base/sections/join/Join"
import Contact from "../components/base/sections/contact/Contact"
import {shuffleArray} from "../helper";

export const query = graphql`
	query {
		participants: markdownRemark(fileAbsolutePath: {regex: "//content/markdown-pages/data/participants/index.md/"}) {
			frontmatter {
				participants {
					name
					flowerbeds {
						title
						imagesDir
					}
				}
			}
		}

		images: allFile(
			filter: {
				relativePath: {
					glob: "flowerbeds/**/*.{JPG,jpg,PNG,png,gif}"
				}
			}
			sort: {
				order: ASC,
				fields: relativePath
			}
		) {
			edges {
				node {
					id
					relativePath
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
			}
		}
	}
`

const IndexPage = ({ data }) => {
	const images = data.images?.edges?.map(({ node }) => node)
	const imagesWithAuthors = useMemo(() => {
		const mapped = images.map((image) => {
			let author = null

			for (const participant of data.participants?.frontmatter?.participants) {
				let found = false

				for (const flowerbed of participant.flowerbeds) {
					if (
						flowerbed.imagesDir &&
						(`images/${ image.relativePath }`).indexOf(flowerbed.imagesDir) !== -1
					) {
						author = participant.name
						found = true
						break;
					}
				}

				if (found) {
					break;
				}
			}

			return {
				author,
				...image
			}
		})

		return shuffleArray(mapped)
	})

	return (
		<Layout>
s
			<SEO title="Willkommen" />

			<Header
				images={ imagesWithAuthors }
			/>

			<News />
			<About />
			<Join />
			<Map />
			<Contact />

		</Layout>
	)
}

export default IndexPage
