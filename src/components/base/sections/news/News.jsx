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
	subtitle,
	date,
	target = "_blank",
	buttonTitle,
	description,
	disableButton,
	image,
	author,
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
					size={ 5 }
					mb={ 1 }
					dangerouslySetInnerHTML={ { __html: subtitle } }
				/>

				<Heading
					size={ 2 }
					mb={2}
					dangerouslySetInnerHTML={ { __html: title } }
				/>

				<Heading
					size={ 6 }
					mt={ 1 }
					spaced={ true }
					italic={ true }
					textFamily={ "secondary" }
					textWeight={ "light" }
				>
					vom {new Date(date).toLocaleDateString(undefined, {
						year: "2-digit",
						month: "2-digit",
						day: "2-digit",
					})}
					{ author && ` · ${ author }` }
				</Heading>

				<Content>
					{ description }
				</Content>

				{ !disableButton &&
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
				}
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
								published
								title
								subtitle
								description
								isExternal
								disableButton
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
							teaserImg,
							isExternal,
							disableButton,
							buttonTitle,
							link,
							...frontmatter
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
						disableButton={ disableButton }
						image={ teaserImg }
						buttonTitle={ buttonTitle || "Mehr lesen" }
						{ ...frontmatter }
					/>
				),
			) }
		</div>
	)
}

export default News