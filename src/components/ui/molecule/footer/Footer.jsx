import React from "react";
import { Link } from "gatsby";

import Container from "react-bulma-components/lib/components/container/container";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";

import Hero from "react-bulma-components/lib/components/hero/hero";
import HeroFooter from "react-bulma-components/lib/components/hero/components/hero-footer";

import Styles from "./Footer.module.scss";
import Interferer from "../interferer/Interferer";


const Footer = () => {
    return (
        <Interferer
            hasTransitionTop
            backgroundColor={ "primary-light" }>
            <Hero>
                <HeroFooter>
                    <Container>
                        <Columns>
                            <Column className={ Styles.links }>
                                <Link to={ "/impressum" }>Impressum</Link>
                                <Link to={ "/datenschutz" }>Datenschutzhinweise</Link>

                                <Link
                                    to={ "https://www.coderwelsch.com" }
                                    target={ "_blank" }
                                    rel={ "noreferrer noopener" }
                                    className={ Styles.copyright }>
                                    Ⓒ Coderwelsch – Codin & Design
                                </Link>
                            </Column>
                        </Columns>
                    </Container>
                </HeroFooter>
            </Hero>
        </Interferer>
    );
}

export default Footer;
