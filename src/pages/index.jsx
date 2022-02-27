import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import Layout from "../components/base/layout/Layout"
import Map from "../components/base/sections/map/Map"
import SEO from "../components/base/seo/SEO"
import Header from "../components/ui/molecule/header/Header"

import News from "../components/base/sections/news/News"
import About from "../components/base/sections/about/About"
import Join from "../components/base/sections/join/Join"
import Contact from "../components/base/sections/contact/Contact"


const IndexPage = () => {
	const imagesQuery = useStaticQuery(graphql`
		query {
			allFile(
				filter: {
					relativePath: {
						glob: "teaser/**/*.{JPG,jpg,PNG,png,gif}"
					}
				}
				sort: {
					order: ASC,
					fields: name
				}
			) {
				edges {
					node {
						id
						childImageSharp {
							gatsbyImageData(layout: FULL_WIDTH)
						}
					}
				}
			}
		}
	`)

	const images = imagesQuery.allFile.edges.map(({node}) => node)

	return (
		<Layout>

			<SEO title="Willkommen" />

			<Header
				images={ images }
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
