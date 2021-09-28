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
    return (
        <Interferer id={ "news" }>
            <Heading
                size={ 1 }
                textAlignment={ "centered" }
            >
                Aktuelles
            </Heading>

            <NewsList />

            <hr/>
        </Interferer>
    )
}

const NewsItem = ({
    href,
    title,
    buttonTitle,
    children,
    image,
}) => {
    return (
        <Columns
            renderAs={ "a" }
            href={ href }
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
                    size: 7
                } }
            >
                <GatsbyImage
                    className={ Styles.image }
                    objectFit="cover"
                    objectPosition="50% 50%"
                    fluid={ image.childImageSharp.fluid }
                />
            </Column>

            <Column className={ Styles.content }>
                <Heading
                    size={ 2 }
                >
                    { title }
                </Heading>

                <Content>{ children }</Content>

                <ButtonGroup>
                    <Button
                        className={ Styles.button }
                        color={ "primary" }
                        renderAs={ "a" }
                        target={ "_blank" }
                        href={ href }>
                        { buttonTitle }
                    </Button>
                </ButtonGroup>
            </Column>
        </Columns>
    )
}

function NewsList () {
    const query = useStaticQuery(graphql`
        query {
            tvImage: file(relativePath: { eq: "images/news/hauptstadt-tv.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1920, maxHeight: 1080) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }

            priceImage: file(relativePath: { eq: "images/news/klimapreis.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1920, maxHeight: 1080) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <div className={ Styles.newsContainer }>
            <NewsItem
                href={ "https://www.pnn.de/potsdam/potsdamer-klimapreis-auf-dem-umweltfest-verliehen-regenwasser-pflanzprojekte-und-kunst-aus-muell/27627492.html" }
                title={ "👑 Kleiner König Zukunft – Klimapreis 2021" }
                buttonTitle={ "Mehr lesen" }
                image={ query.priceImage }
            >
                Am 19.09. wurde der diesjährige Klimapreis an insgesamt sechs coole Projekte verliehen – Bürger:Beete war unter den Gewinnern! 😍🏆🌹
            </NewsItem>

            <NewsItem
                href={ "https://hauptstadt.tv/mediathek/stadtleben/bluehbeete-gegen-insektensterben/" }
                title={ "🎬 Interview mit hauptstadt.tv" }
                buttonTitle={ "Zum Interview" }
                image={ query.tvImage }
            >
                Am 6. April gab es ein kleines Interview mit einem super netten Kamerateam vom Hauptstadt.tv! Vielen Dank an Mandy und Lisa für euren Einsatz vor der Kamera! Es hat echt Spaß gemacht 😍!
            </NewsItem>
        </div>
    )
}

export default News;