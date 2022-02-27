import React from "react"
import GatsbyImage from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { Columns, Heading, Content, Button } from "react-bulma-components"
import Image from "../../../ui/atom/image/Image"

import Interferer from "../../../ui/molecule/interferer/Interferer"
import * as Styles from "./News.module.scss"


const News = () => {
	return (
		<Interferer id={ "news" }>
			<Heading
				size={ 1 }
				textAlign={ "centered" }
			>
				Aktuelles
			</Heading>

			<NewsList />

			<hr />
		</Interferer>
	)
}

const NewsItem = ({
	href,
	title,
	target = "_blank",
	buttonTitle,
	description,
	image,
}) => {
	return (
		<Columns
			paddingless
			vCentered
			className={ Styles.newsItem }
			alignItems={ "stretch" }
			onClick={ (event) => {
				if (event.target.tagName.toLowerCase() !== "a") {
					window.open(href, target)
				}
			} }
		>

			<Columns.Column
				paddingless
				tablet={ {
					size: 6,
				} }
				desktop={ {
					size: 7,
				} }
			>
				<Image
					data={ image }
					className={ Styles.image }
					objectFit="cover"
					objectPosition="50% 50%"
				/>
			</Columns.Column>

			<Columns.Column className={ Styles.content }>
				<Heading
					size={ 2 }
				>
					{ title }
				</Heading>

				<Content>
					{ description }
				</Content>

				<Button.Group>
					<Button
						className={ Styles.button }
						color={ "primary" }
						renderAs={ "a" }
						target={ target }
						href={ href }
					>
						{ buttonTitle }
					</Button>
				</Button.Group>
			</Columns.Column>
		</Columns>
	)
}

function NewsList() {
	const query = useStaticQuery(graphql`
		query {
			allFile(
				filter: {
					relativePath: { glob: "blog/**/*.md" }
				}
				sort: {
					order: DESC,
					fields: relativeDirectory
				}
			) {
				edges {
					node {
						relativePath
						relativeDirectory
						childMarkdownRemark {
							frontmatter {
								title
								subtitle
								description
								isExternal
								link
								buttonTitle
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

	const blogEntries = query.allFile.edges.map(({ node }) => node)

	return (
		<div className={ Styles.newsContainer }>
			{ blogEntries.map(
				({
					childMarkdownRemark: {
						frontmatter: {
							title,
							subtitle,
							teaserImg,
							isExternal,
							buttonTitle,
							description,
							link,
						},
					},
					relativeDirectory,
					relativePath,
					...entry
				}) => (
					<NewsItem
						key={ relativePath }
						href={ isExternal ? link : relativeDirectory }
						target={ isExternal ? "_blank" : "_self" }
						title={ title }
						subtitle={ subtitle }
						description={ description }
						image={ teaserImg }
						buttonTitle={ buttonTitle || "Mehr lesen" }
					/>
				),
			) }
		</div>
	)
}

export default News