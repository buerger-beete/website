import { graphql, useStaticQuery } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"
import React from "react"
import { Button, Columns, Content, Heading } from "react-bulma-components"
import Image from "../../../ui/atom/image/Image"

import Interferer from "../../../ui/molecule/interferer/Interferer"
import * as Styles from "./About.module.scss"


const About = () => {
	const query: {
		file: ImageDataLike
	} = useStaticQuery(graphql`
		query {
			file(relativePath: { eq: "about/flower-pots.png" }) {
				childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH)
				}
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
					>
						Samen säen. Kiez verschönern.<br />
						Connecten. Insekten retten 🌻
					</Heading>

					<Content>
						<p>
							Wir, die Initiative <em>Bürger:Beete</em>, verwandeln Potsdam in ein blühendes Paradies.
							Wir machen das für einen grüneren Kiez. Für&nbsp;Insekten. Gegen das Aufheizen der Städte und
							hitziger Gemüte, welche ihre Köpfe mit ein wenig Gartenarbeit abkühlen&nbsp;können&nbsp;❄️
						</p>

						<p>
							Wir haben einen Deal mit der Stadt ausgehandelt und bekommen von ihnen Brachflächen, Wiesen
							und Baumareale aufbereitet, die wir an interessierte Bürger:innen zur freien Bepflanzung
							vergeben.
						</p>

						<p>
							🤬 Dich regt eine kahle graue Fläche vor deinem Haus auf? — Begrüne sie doch ganz
							einfach mit unserer Hilfe!
						</p>

						<p>
							🛍 Du hast einen Shop in Potsdam? Zeige Engagement und kümmere dich
							mit deinen Mitarbeiter:innen um ein bisschen Grün vor deinem Laden&nbsp;😋
						</p>

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