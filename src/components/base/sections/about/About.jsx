import React from "react"
import GatsbyImage from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { Columns, Heading, Content, Button } from "react-bulma-components"
import Image from "../../../ui/atom/image/Image"

import Interferer from "../../../ui/molecule/interferer/Interferer"
import * as Styles from "./About.module.scss"


const About = () => {
	const query = useStaticQuery(graphql`
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
				vCentered
				className={ Styles.columns }
			>
				<Columns.Column size={ 12 } mb={ 6 }>
					<Heading
						style={ {
							fontSize: "6rem",
							letterSpacing: "0.1rem"
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
						objectFit="cover"
						objectPosition="50% 50%"
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
							… möchten wir, die Initiative Bürger:Beete, unsere Stadt Potsdam in ein blühendes
							Paradies verwandeln. Für den kiez. Für die BienenDafür brauchen wir deine Hilfe. Je mehr mitmachen, desto besser!
						</p>

						<p>
							Wir haben einen Deal mit der Stadt ausgehandelt und bekommen von ihnen Brachflächen und
							Baumareale aufbereitet, die wir an interessierte Bürger:innen zur freien Bepflanzung
							vergeben.
						</p>

						<p>
							<strong>Das wird soo cool! ☺️</strong>
						</p>

						<Button.Group className={ Styles.button }>
							<Button
								color={ "primary" }
								renderAs={ "a" }
								href={ "#join" }
							>
								Die 4 Schritte zu deinem Beet
							</Button>
						</Button.Group>
					</Content>
				</Columns.Column>

			</Columns>
		</Interferer>
	)
}

export default About