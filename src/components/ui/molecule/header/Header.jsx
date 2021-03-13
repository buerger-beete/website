import React from "react";
import {graphql, useStaticQuery} from "gatsby";
import GatsbyImage from "gatsby-image";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";

import Tags from "react-bulma-components/lib/components/tag/components/tag-group";
import Tag from "react-bulma-components/lib/components/tag/tag";

import Heading from "react-bulma-components/lib/components/heading/heading";

import ButtonGroup from "react-bulma-components/lib/components/button/components/button-group";
import Button from "react-bulma-components/lib/components/button/button";

import Hero from "react-bulma-components/lib/components/hero/hero";
import Body from "react-bulma-components/lib/components/hero/components/hero-body";

import Styles from "./Header.module.scss";


const Header = () => {
    const query = useStaticQuery(graphql`
        query {
            fileName: file(relativePath: { eq: "images/teaser/slide-1.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1920, maxHeight: 1080) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        } 
    `);

    return (
        <Hero
            size={"medium"}
            className={ Styles.hero }>

            <Body className={ Styles.body }>
                <GatsbyImage
                    className={ Styles.image }
                    fluid={ query.fileName.childImageSharp.fluid }
                />

                <Columns className={ Styles.overlay }>
                    <Column
                        narrow
                        className={ "is-centered" }>

                        <Tags className={ Styles.tags }>
                            <Tag
                                backgroundColor={ "dark" }
                                textColor={ "white" }
                                textWeight={ "bold" }
                                size={ "large" }>
                                Bürger:innen begrünen Potsdam
                            </Tag>
                        </Tags>

                        <Heading
                            textAlignment={ "centered" }
                            textColor={ "white" }
                            size={ 1 }
                            className={ Styles.heading }>
                            Heute Grau. <br/>
                            Morgen Bunt!
                        </Heading>

                        <ButtonGroup position={ "centered" }>
                            <Button
                                color={ "primary" }
                                size={ "medium" }
                                renderAs={ "a" }
                                href={ "#about" }>
                                Mehr Infos
                            </Button>
                        </ButtonGroup>
                    </Column>
                </Columns>
            </Body>

        </Hero>
    );
}

export default Header;
