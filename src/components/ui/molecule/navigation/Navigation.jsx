import React from "react"
import { Container, Navbar, Menu, Button } from "react-bulma-components"
import scrollIntoView from "smooth-scroll-into-view-if-needed"

import LOGO_SRC from "../../../../assets/logos/buerger-beete.svg"
import * as Styles from "./Navigation.module.scss"
import ContactButton from "../../atom/contact-button/ContactButton"


const NavLink = ({ id, children }) => {
	return (
		<Navbar.Item
			textWeight={ "bold" }
			textSize={ 5 }
			hoverable={ false }
			renderAs={ "a" }
			textColor={ "white" }
			className={ Styles.navLink }
			onClick={ () => scrollIntoView(document.getElementById(id), { block: "start" }) }
		>

			<span>
				{ children }
			</span>

		</Navbar.Item>
	)
}

const Navigation = ({ type }) => {

	return (
		<div className={ Styles.navContainer }>
			<Container
				alignItems={ "stretch" }
				justifyContent={ "space-between" }
			>
				<Navbar
					className={ Styles.nav }
					alignItems={ "stretch" }
					justifyContent={ "center" }
				>
					{ type === "simple-page" ? (
						<Button.Group align={ "center" }>
							<Button
								color={ "white" }
								outlined={ true }
								renderAs={ "a" }
								href={ "/" }
							>
								Zurück zur Startseite
							</Button>
						</Button.Group>
					) : (
						<>
							<Navbar.Brand>
								<Navbar.Item
									renderAs={ "a" }
									href={ "/" }
								>
									<img
										src={ LOGO_SRC }
										className={ Styles.logo }
										alt="Logo Bürger:Beete"
									/>
								</Navbar.Item>
							</Navbar.Brand>

							<Navbar.Menu>
								<Navbar.Container
									align={ "right" }
									className={ Styles.navItems }
								>

									<div className={ Styles.linksContainer }>
										<NavLink id={ "news" }>
											Aktuelles
										</NavLink>

										<NavLink id={ "about" }>
											???
										</NavLink>

										<NavLink id={ "join" }>
											Dein Beet
										</NavLink>

										<NavLink id={ "map" }>
											Karte
										</NavLink>
									</div>

									<ContactButton
										outlined
										size={ "normal" }
										label={ "Mail schreiben" }
										color={ "white" }
									/>

								</Navbar.Container>
							</Navbar.Menu>
						</>
					) }
				</Navbar>
			</Container>
		</div> )
}

Navigation.propTypes = {}

Navigation.defaultProps = {}

export default Navigation
