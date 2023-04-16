import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Button, Columns, Content, Heading } from "react-bulma-components"
import Image from "@/components/ui/atom/image/Image"

import Interferer from "@/components/ui/molecule/interferer/Interferer"
import ReactMarkdown from "react-markdown"
import * as Styles from "./About.module.scss"


const About = () => {
	const query = useStaticQuery(graphql`
		query {
			file(relativePath: { eq: "about/flower-pots.png" }) {
				childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH)
				}
			}

			about: markdownRemark(fileAbsolutePath: {regex: "//content/about/index.md/"}) {
				frontmatter {
					title
				}
				rawMarkdownBody
			}
		}
	`)

	return (
		<Interferer id={ "about" }>
			<Columns
				centered
				className={ Styles.columns }
			>
				<Columns.Column size={ 12 } mb={ 6 }>
					<Heading
						style={ {
							fontSize: "6rem",
							letterSpacing: "0.1rem",
						} }
						textAlign={ "center" }
					>
						???
					</Heading>
				</Columns.Column>

				<Columns.Column
					tablet={ {
						size: 4,
					} }
					desktop={ {
						size: 4,
					} }
				>
					<Image
						className={ Styles.image }
						objectFit={ "cover" }
						objectPosition={ "50% 50%" }
						alt={ "Angezogene Pflanzen" }
						data={ query.file }
					/>
				</Columns.Column>

				<Columns.Column
					tablet={ {
						size: 8,
					} }
					desktop={ {
						size: 6,
					} }
					className={ Styles.description }
				>
					<Heading
						size={ 3 }
						renderAs={ "h2" }
						dangerouslySetInnerHTML={{ __html: query.about.frontmatter.title }}
					/>

					<Content>
						<ReactMarkdown>
							{ query.about.rawMarkdownBody }
						</ReactMarkdown>

						<Button.Group
							mt={ 6 }
							mb={ 6 }
						>
							<Button
								color={ "primary" }
								renderAs={ "a" }
								href={ "#join" }
							>
								&nbsp;&nbsp;Die 4 Schritte zum Beet →
							</Button>
						</Button.Group>
					</Content>
				</Columns.Column>

			</Columns>
		</Interferer>
	)
}

export default About