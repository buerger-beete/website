import { ImageDataLike } from "gatsby-plugin-image"
import React from "react"

import { Columns, Content, Heading, Section, Tag } from "react-bulma-components"

import Layout from "../../components/base/layout/Layout"
import Seo from "../../components/base/seo/Seo"
import Slideshow from "../../components/ui/molecule/header/Slideshow/Slideshow"

import * as Styles from "./index.module.scss"


interface BlogEntryPageProps {
	pageContext: {
		html: string,
		frontmatter: {
			title: string,
			subtitle: string,
			author: string,
			date: string,
			teaserImg: ImageDataLike & {
				author: string,
				id: string,
				relativePath: string,
			}
		}
	}
}


const BlogEntryPage = ({ pageContext }: BlogEntryPageProps) => {
	const { html } = pageContext

	const {
		title,
		subtitle,
		author,
		date,
		teaserImg
	} = pageContext.frontmatter

	const creationDate = new Date(date).toLocaleString(
		"de",
		{
			day: "numeric",
			month: "short",
			year: "numeric"
		})

	return (
		<Layout type={ "simple-page" }>

			<Seo title={ title } />

			<Section paddingless={ true }>
				<Slideshow
					mediaFiles={ [ teaserImg ] }
					organicArrows={ true }
					className={ Styles.slideshow }
					contentClassName={ Styles.content }
				>
					<Tag.Group justifyContent={ "center" }>
						<Tag
							color={ "primary" }
							textWeight={ "bold" }
							style={ { letterSpacing: "0.5px" } }
							textSize={ 6 }
						>
							{ subtitle }
						</Tag>
					</Tag.Group>

					<Heading
						textAlign={ "center" }
						style={ { marginLeft: "-2px" } }
						renderAs={ "h1" }
						textColor={ "white" }
						size={ 1 }
						dangerouslySetInnerHTML={ { __html: title } }
					/>

					<Heading
						textAlign={ "center" }
						style={ { marginLeft: "-2px" } }
						renderAs={ "h1" }
						textColor={ "primary" }
						size={ 5 }
					>
						<span className={ "has-text-white" }>{ creationDate }, </span>{ author }
					</Heading>
				</Slideshow>
			</Section>

			<Section>
				<Columns centered>
					<Columns.Column size={ 6 }>
						<Content
							mb={ 6 }
							dangerouslySetInnerHTML={ { __html: html } }
						/>
					</Columns.Column>
				</Columns>
			</Section>

		</Layout>
	)
}

export default BlogEntryPage
