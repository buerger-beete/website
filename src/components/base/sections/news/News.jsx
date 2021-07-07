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
import Styles from "./News.module.scss";


const News = () => {
    const query = useStaticQuery(graphql`
        query {
            fileName: file(relativePath: { eq: "images/news/hauptstadt-tv.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1920, maxHeight: 1080) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <Interferer id={ "news" }>
            <Heading
                size={ 1 }
                textAlignment={ "centered" }
            >
                Aktuelles
            </Heading>

            <NewsList
                imageFile={ query.fileName }
            />

            <hr/>
        </Interferer>
    )
}

function NewsList ({ imageFile }) {
    return (
        <div className={ Styles.newsContainer }>
            <Columns
                renderAs={ "a" }
                href={ "https://hauptstadt.tv/mediathek/stadtleben/bluehbeete-gegen-insektensterben/" }
                target={ "_blank" }
                paddingless
                vCentered
                className={ Styles.newsItem }>

                <Column
                    paddingless
                    tablet={ {
                        size: 6
                    } }
                    desktop={ {
                        size: 8
                    } }
                >
                    <GatsbyImage
                        className={ Styles.image }
                        objectFit="cover"
                        objectPosition="50% 50%"
                        fluid={ imageFile.childImageSharp.fluid }
                    />
                </Column>

                <Column className={ Styles.content }>
                    <Heading
                        size={ 2 }
                    >
                        Interview mit <u>hauptstadt.tv</u>!
                    </Heading>

                    <Content>Am 6. April gab es ein kleines Interview mit einem super netten Kamerateam vom Hauptstadt.tv! Vielen Dank an Mandy und Lisa für euren Einsatz vor der Kamera! Es hat echt Spaß gemacht 😍!</Content>

                    <ButtonGroup>
                        <Button
                            className={ Styles.button }
                            color={ "primary" }
                            renderAs={ "a" }
                            target={ "_blank" }
                            href={ "https://hauptstadt.tv/mediathek/stadtleben/bluehbeete-gegen-insektensterben/" }>
                            Zum Interview
                        </Button>
                    </ButtonGroup>
                </Column>

            </Columns>
        </div>
    )
}

export default News;