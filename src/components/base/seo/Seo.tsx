import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"


interface SeoProps {
	description?: string;
	lang?: string;
	meta?: {
		name: string;
		content: string;
	}[];
	title: string;
}


function Seo ({ description, lang = "de", meta = [], title }: SeoProps) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`,
	)

	const metaDescription = description || site.siteMetadata.description
	const defaultTitle = site.siteMetadata?.title

	return (
		<Helmet
			htmlAttributes={ {
				lang,
			} }
			title={ title }
			titleTemplate={ defaultTitle ? `%s | ${ defaultTitle }` : undefined }
			meta={ [
				{
					name: "description",
					content: metaDescription,
				},
				{
					property: "og:title",
					content: title,
				},
				{
					property: "og:description",
					content: metaDescription,
				},
				{
					property: "og:type",
					content: "website",
				},
				{
					name: "twitter:card",
					content: "summary",
				},
				{
					name: "twitter:creator",
					content: site.siteMetadata?.author || "",
				},
				{
					name: "twitter:title",
					content: title,
				},
				{
					name: "twitter:description",
					content: metaDescription,
				},
			].concat(meta) }
		/>
	)
}

export default Seo