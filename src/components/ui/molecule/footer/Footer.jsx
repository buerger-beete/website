import React from "react"
import { Link } from "gatsby"

import { Container, Columns, Hero } from "react-bulma-components"
import { cn } from "reusable-components/dist/helper"

import * as Styles from "./Footer.module.scss"
import Interferer from "../interferer/Interferer"


const Footer = () => {
	return (
		<Interferer
			hasTransitionTop
			backgroundColor={ "primary-light" }
		>
			<Hero>
				<Hero.Footer>
					<Container>
						<Columns>
							<Columns.Column
								size={ 6 }
								tablet={ {
									size: 6,
								} }
								className={ Styles.links }
							>

								<Link to={ "/impressum" }>Impressum</Link>
								<Link to={ "/datenschutz" }>Datenschutzhinweise</Link>

							</Columns.Column>

							<Columns.Column
								className={ cn(Styles.links, Styles.copyright) }
								size={ 6 }
								tablet={ {
									size: 6,
								} }
							>
								<a
									href={ "https://www.coderwelsch.com" }
									target={ "_blank" }
									rel={ "noreferrer noopener" }
								>
									Ⓒ Coderwelsch – Coding & Design
								</a>
							</Columns.Column>
						</Columns>
					</Container>
				</Hero.Footer>
			</Hero>
		</Interferer>
	)
}

export default Footer
