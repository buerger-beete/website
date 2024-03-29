import React from "react"
import { Button, Columns, Content, Heading } from "react-bulma-components"

import ICONS from "@/constants/Icons"
import { getMailLink } from "@/helper"
import ContactButton from "@/components/ui/atom/contact-button/ContactButton"
import Interferer from "@/components/ui/molecule/interferer/Interferer"

import * as Styles from "./Contact.module.scss"


const Contact = () => {
	return (
		<Interferer id={ "join" }>

			<Columns
				centered
				vCentered
				className={ Styles.columns }
			>

				<Columns.Column
					className={ Styles.description }
					tablet={ {
						size: 8,
					} }
					desktop={ {
						size: 6,
					} }
				>

					<img
						src={ ICONS.join }
						alt={ "Icon: Kontaktiere uns!" }
						className={ Styles.icon }
					/>

					<Heading
						size={ 1 }
						textAlign={ "centered" }
					>
						Du hast Interesse?
					</Heading>

					<Content
						className={ Styles.text }
						textAlign={ "centered" }
					>
						<p>Das ist super! Schreib uns eine unverbindliche E-Mail an <a
							href={ getMailLink() }
						><strong>info@buerger-beete.de</strong></a> mit deinen Ideen. Wir schicken dir darauf weitere
						   Informationen zu.
						</p>
						<p><strong>Wir freuen uns auf dich!</strong></p>
					</Content>

					<Button.Group align={ "center" }>
						<ContactButton
							label={ "Unverb. E-Mail schreiben" }
						/>
					</Button.Group>
				</Columns.Column>

			</Columns>
		</Interferer>
	)
}

export default Contact