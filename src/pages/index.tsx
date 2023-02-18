import { graphql, PageProps } from "gatsby"
import { useMemo } from "react"
import { Element } from "react-bulma-components"

import Layout from "../components/base/layout/Layout"
import About from "../components/base/sections/about/About"
import JoinOurMailGroup from "../components/base/sections/join-us/JoinUs"
import Join from "../components/base/sections/join/Join"
import Map from "../components/base/sections/map/Map"

import News from "../components/base/sections/news/News"
import Seo from "../components/base/seo/Seo"
import Header from "../components/ui/molecule/header/Header"
import { shuffleArray } from "../helper"


export interface Flowerbed {
	title: string,
	imagesDir?: string,
	location: [ number, number ],
	description: string,
	color?: string
}


export interface PageData {
	participants: {
		frontmatter: {
			participants: {
				name: string,
				flowerbeds: Flowerbed[]
			}[]
		}
	}
	images: {
		edges: {
			node: {
				id: string,
				relativePath: string,
				childImageSharp: Record<string, unknown>
			}
		}[]
	}
}


export const query = graphql`
	query {
		participants: markdownRemark(fileAbsolutePath: {regex: "//content/data/participants/index.md/"}) {
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

const IndexPage = ({ data }: PageProps<PageData>) => {
	const images = data.images.edges.map(({ node }) => node)

	const imagesWithAuthors = useMemo(() => {
		const mapped = images.map((image) => {
			let author: string | null = null

			for (const participant of data.participants.frontmatter.participants) {
				let found = false

				for (const flowerbed of participant.flowerbeds) {
					if (
						flowerbed.imagesDir &&
						(`images/${ image.relativePath }`).indexOf(flowerbed.imagesDir) !== -1
					) {
						author = participant.name
						found = true
						break
					}
				}

				if (found) {
					break
				}
			}

			return {
				author,
				...image,
			}
		})

		return shuffleArray(mapped)
	}, [ images ])

	return (
		<Layout>

			<Seo title={ "Willkommen" } />

			<Header
				images={ imagesWithAuthors }
			/>

			<JoinOurMailGroup />

			<News />
			<About />
			<Join />
			<Map />

			{/* SPACING */ }
			<Element p={ 6 } />
			<Element p={ 6 } />

			{/*<Contact />*/ }

		</Layout>
	)
}

export default IndexPage
