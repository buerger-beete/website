import { ReactNode } from "react"
import { Button, Container, Navbar } from "react-bulma-components"
import scrollIntoView from "smooth-scroll-into-view-if-needed"

import LOGO_SRC from "../../../../assets/logos/buerger-beete.svg"
import ContactButton from "../../atom/contact-button/ContactButton"
import * as Styles from "./Navigation.module.scss"


interface NavLinkProps {
	id: string,
	children: ReactNode
}


const NavLink = ({ id, children }: NavLinkProps) => {
	return (
		<Navbar.Item
			textWeight={ "bold" }
			textSize={ 5 }
			renderAs={ "a" }
			textColor={ "white" }
			className={ Styles.navLink }
			onClick={ () => scrollIntoView(document.getElementById(id)!, { block: "start" }) }
		>

			<span>
				{ children }
			</span>

		</Navbar.Item>
	)
}

export type NavigationType = "simple-page"


interface NavigationProps {
	type?: NavigationType
}


const Navigation = ({ type }: NavigationProps) => {
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
										alt={ "Logo Bürger:Beete" }
									/>
								</Navbar.Item>
							</Navbar.Brand>

							<Navbar.Menu>
								<Navbar.Container
									align={ "right" }
									className={ Styles.navItems }
								>

									<div className={ Styles.linksContainer }>
										<NavLink id={ "join-us" }>
											📧&nbsp;&nbsp;Mail Verteiler
										</NavLink>

										<NavLink id={ "news" }>
											🗞 Aktuelles
										</NavLink>

										<NavLink id={ "about" }>
											? ? ?
										</NavLink>

										<NavLink id={ "join" }>
											🪴&nbsp;&nbsp;Dein Beet
										</NavLink>

										<NavLink id={ "map" }>
											🗺&nbsp;&nbsp;Karte
										</NavLink>
									</div>

									<ContactButton
										outlined
										size={ "normal" }
										label={ "Auf die Warteliste" }
										color={ "white" }
									/>

								</Navbar.Container>
							</Navbar.Menu>
						</>
					) }
				</Navbar>
			</Container>
		</div>)
}

export default Navigation
