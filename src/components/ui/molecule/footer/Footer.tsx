import { Link } from "gatsby"
import React from "react"

import { Columns, Container, Hero } from "react-bulma-components"
import classNames from "../../../../helper/class-names"
import Interferer from "../interferer/Interferer"

import * as Styles from "./Footer.module.scss"


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

								<Link to={ "https://github.com/buerger-beete/website" } target={ "_blank" }>Github</Link>

							</Columns.Column>

							<Columns.Column
								className={ classNames(Styles.links, Styles.copyright) }
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
