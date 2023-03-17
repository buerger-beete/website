import { ImageDataLike } from "gatsby-plugin-image"
import React from "react"
import { Button, Columns, Heading, Hero, Tag } from "react-bulma-components"
import * as Styles from "./Header.module.scss"
import "./Header.scss"

import Slideshow from "./Slideshow/Slideshow"


interface HeaderProps {
	images: Array<ImageDataLike & {
		author: string,
		id: string,
		relativePath: string,
	}>
}


const Header = (props: HeaderProps) => {
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
									textSize: 5,
								} }
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
							Info: Derzeitig keine weiteren<br />
							Bearbeitungen möglich ❌
						</Heading>

						<Button.Group align={ "center" }>
							<Button
								renderAs={ "a" }
								href={ "#news" }
								color={ "primary" }
							>
								Zu den Neuigkeiten
							</Button>
						</Button.Group>
					</Columns.Column>
				</Columns>
			</Hero.Body>

		</Hero>
	)
}

export default Header
