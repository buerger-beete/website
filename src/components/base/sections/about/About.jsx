import React from "react";
import GatsbyImage from "gatsby-image";
import {graphql, useStaticQuery} from "gatsby";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";

import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";

import ButtonGroup from "react-bulma-components/lib/components/button/components/button-group";
import Button from "react-bulma-components/lib/components/button/button";

import Interferer from "../../../ui/molecule/interferer/Interferer";
import Styles from "./About.module.scss";


const About = () => {
    const query = useStaticQuery(graphql`
        query {
            fileName: file(relativePath: { eq: "about/flower-pots.png" }) {
                childImageSharp {
                    fluid(maxWidth: 906, maxHeight: 1206) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <Interferer id={ "about" }>
            <Columns
                centered
                vCentered
                className={ Styles.columns }>

                <Column
                    tablet={ {
                        size: 4
                    } }
                    desktop={ {
                        size: 4
                    } }>

                    <GatsbyImage
                        className={ Styles.image }
                        fluid={ query.fileName.childImageSharp.fluid }
                    />
                </Column>

                <Column
                    tablet={ {
                        size: 8
                    } }
                    desktop={ {
                        size: 6
                    } }
                    className={ Styles.description }>

                    <Heading size={ 1 }>
                        Wie im Intro von <br/>
                        Peter Lustig 🌻
                    </Heading>

                    <Content>
                        <p>
                            … möchten wir, die Initiative Go ’n’ Grow, unsere graue Stadt Potsdam in ein blühendes Blumenparadies verwandeln. Dafür brauchen wir deine Hilfe. Je mehr mitmachen, desto besser!
                        </p>

                        <p>
                            Wir haben einen Deal mit der Stadt ausgehandelt  und bekommen Brachflächen wie Baumareale und ungenutzte Beete aufbereitet, die wir an interessierte Bürger zur freien Bepflanzung vergeben.
                        </p>

                        <p>
                            <strong>Das wird soo cool! ☺️</strong>
                        </p>

                        <ButtonGroup className={ Styles.button }>
                            <Button
                                color={ "primary" }
                                renderAs={ "a" }
                                href={ "#join" }>
                                Die 4 Schritte zu deinem Beet
                            </Button>
                        </ButtonGroup>
                    </Content>
                </Column>

            </Columns>
        </Interferer>
    )
}

export default About;