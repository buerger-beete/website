import React from "react"

import Container from "react-bulma-components/lib/components/container/container";
import Navbar from "react-bulma-components/lib/components/navbar/navbar";
import Brand from "react-bulma-components/lib/components/navbar/components/brand";
import Item from "react-bulma-components/lib/components/navbar/components/item";
import Menu from "react-bulma-components/lib/components/navbar/components/menu";
import NavContainer from "react-bulma-components/lib/components/navbar/components/container";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import LOGO_SRC from "../../../../assets/logos/buerger-beete.svg";
import Styles from "./Navigation.module.scss"
import ContactButton from "../../atom/contact-button/ContactButton";


const NavLink = ({ id, children }) => {
    return (
        <Item
            textWeight={ "bold" }
            textSize={ 5 }
            hoverable={ false }
            renderAs={ "a" }
            textColor={ "white" }
            className={ Styles.navLink }
            onClick={ () => scrollIntoView(document.getElementById(id)) }>

            <span>
                { children }
            </span>

        </Item>
    );
};

const Navigation = () => (
    <div className={ Styles.navContainer }>
        <Container>
            <Navbar className={ Styles.nav }>
                <Brand>
                    <Item
                        renderAs={ "a" }
                        href={ "/" }>
                        <img
                            src={ LOGO_SRC }
                            className={ Styles.logo }
                            alt="Logo Bürger:Beete"
                        />
                    </Item>
                </Brand>

                <Menu>
                    <NavContainer
                        position={ "end" }
                        className={ Styles.navItems }>

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

                    </NavContainer>
                </Menu>
            </Navbar>
        </Container>
    </div>
)

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation
