import React from "react"
import { Columns, Tag, Heading, Button, Hero } from "react-bulma-components"

import Slideshow from "./Slideshow/Slideshow"
import * as Styles from "./Header.module.scss"
import "./Header.scss"


const Header = (props) => {
	return (
		<Hero
			size={ "medium" }
			className={ Styles.hero }
		>

			<Hero.Body
				className={ Styles.body }
			>
				<Slideshow
					mediaFiles={ props.images }
					organicArrows={ true }
				/>

				<Columns className={ Styles.overlay }>
					<Columns.Column
						narrow
						className={ "is-centered" }
					>

						<Tag.Group className={ Styles.tags }>
							<Tag
								backgroundColor={ "dark" }
								textColor={ "light" }
								textWeight={ "bold" }
								size={ "large" }
								mobile={ {
									textSize: 5
								} }
								className={ Styles.tag }
							>
								Bürger:innen begrünen Potsdam
							</Tag>
						</Tag.Group>

						<Heading
							textAlign={ "centered" }
							textColor={ "white" }
							size={ 3 }
							className={ Styles.heading }
						>
							Info: Derzeitig keine weiteren<br/>
							Bearbeitungen möglich ❌
						</Heading>

						<Button.Group align={ "center" }>
							<Button
								renderAs={ "a" }
								href={ "#news" }
								color={ "primary" }
							>
								Aktuelles
							</Button>
						</Button.Group>
					</Columns.Column>
				</Columns>
			</Hero.Body>

		</Hero>
	)
}

export default Header
