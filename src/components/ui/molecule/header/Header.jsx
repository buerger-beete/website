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

// awesome styles
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import Styles from "./Header.module.scss";
import "./Header.scss"


const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slideshow = () => {
    const query = useStaticQuery(graphql`
        query {
            allFile(
                filter: {
                    relativePath: {
                        glob: "images/teaser/*.*"
                    }
                }
                sort: {
                    order: ASC, 
                    fields: name
                }
            ) {
                nodes {
                    id
                    childImageSharp {
                        fluid(maxWidth: 1920, maxHeight: 1080) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    `);

    return (
        <AutoplaySlider
            play={ true }
            bullets={ false }
            organicArrows={ false }
            cancelOnInteraction={ false } // should stop playing on user interaction
            interval={ 6000 }
            loop={ true }
            className={ Styles.slideshow }
        >
           { query.allFile.nodes.map(file =>
               <div
                   key={ file.id }
                   className={ Styles.slide }
               >
                   <GatsbyImage
                       fluid={ file.childImageSharp.fluid }
                   />
               </div>
           ) }
        </AutoplaySlider>
    );
};


const Header = () => {
    return (
        <Hero
            size={"medium"}
            className={ Styles.hero }>

            <Body className={ Styles.body }>
                <Slideshow/>

                <Columns className={ Styles.overlay }>
                    <Column
                        narrow
                        className={ "is-centered" }>

                        <Tags className={ Styles.tags }>
                            <Tag
                                backgroundColor={ "white" }
                                textColor={ "dark" }
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
