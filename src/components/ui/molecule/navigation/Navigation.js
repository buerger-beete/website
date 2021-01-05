import React from "react"
import PropTypes from "prop-types"

import Container from "react-bulma-components/lib/components/container/container";
import Navbar from "react-bulma-components/lib/components/navbar/navbar";
import Brand from "react-bulma-components/lib/components/navbar/components/brand";
import Item from "react-bulma-components/lib/components/navbar/components/item";
import Menu from "react-bulma-components/lib/components/navbar/components/menu";
import NavContainer from "react-bulma-components/lib/components/navbar/components/container";

import LOGO_SRC from "../../../../assets/logos/buerger-beete.svg";
import Styles from "./Navigation.module.scss"
import ContactButton from "../../atom/contact-button/ContactButton";


const Navigation = ({siteTitle}) => (
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

Navigation.propTypes = {
    siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
    siteTitle: ``,
}

export default Navigation
