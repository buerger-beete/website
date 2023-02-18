import React from "react"
import { Button, Columns, Content, Heading } from "react-bulma-components"

import Interferer from "../../../ui/molecule/interferer/Interferer"


export default function JoinUs () {
	return (
		<Interferer id={ "join-us" }>
			<Heading
				size={ 1 }
				textAlign={ "centered" }
			>
				<span style={ { fontSize: "6rem", lineHeight: "4rem" } }>📧</span><br />
				Tausche dich mit <br />
				Bürger:Beetlern aus
			</Heading>

			<Columns
				centered
				mb={ 6 }
			>
				<Columns.Column
					style={ {
						maxWidth: "38rem",
						width: "100%",
					} }
				>
					<Content
						size={ "large" }
						textAlign={ "center" }
					>
						<p>
							Trete ganz einfach unserer Mailgruppe bei,
							um dich mit anderen Bürger:Beetler:innen rund
							ums Thema Beet&nbsp;🍀&nbsp;auszutauschen:
						</p>
					</Content>

					<Button.Group align={ "center" }>
						<Button
							color={ "primary" }
							renderAs={ "a" }
							target={ "_blank" }
							href={ "https://gaggle.email/join/beetgefluester@buerger-beete.de" }
						>
							&nbsp;&nbsp;&nbsp;Gruppe beitreten →
						</Button>
					</Button.Group>

					<Content
						size={ "small" }
						textColor={ "grey" }
						textAlign={ "center" }
					>
						<p>
							Du kannst dich super einfach wieder abmelden. <br />
							Der E-Mail-Service ist DSGVO-konform gehostet 🔐
						</p>
					</Content>
				</Columns.Column>
			</Columns>

			<hr />
		</Interferer>
	)
}