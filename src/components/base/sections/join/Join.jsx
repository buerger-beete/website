import React from "react";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";

import Heading from "react-bulma-components/lib/components/heading/heading";

import PATCH_FLOWERED_ICON_SRC from "../../../../assets/icons/patch-flowered.svg";

import Styles from "./Join.module.scss";
import Interferer from "../../../ui/molecule/interferer/Interferer";
import InfoTile from "../../../ui/molecule/info-tile/InfoTile";


const Tile = ({ title, icon, children }) =>
    <InfoTile
        title={ title }
        icon={ icon }
        tablet={ {
            size: 3
        } }>
        { children }
    </InfoTile>;

const Join = () => {
    return (
        <Interferer
            id={ "join" }
            backgroundColor={ "primary-light" }
            hasTransitionTop
            hasTransitionBottom
            fullSize>

            <Columns
                centered
                vCentered
                className={ Styles.columns }>

                <Column
                    className={ Styles.description }
                    tablet={ {
                        size: 8
                    } }
                    desktop={ {
                        size: 6
                    } }>

                    <img
                        src={ PATCH_FLOWERED_ICON_SRC }
                        alt="Icon: Blumenbeet"
                        className={ Styles.icon }
                    />

                    <Heading
                        size={ 1 }
                        textAlignment={ "centered" }>
                        In 4 Schritten zum <br/>
                        eigenem Beet
                    </Heading>
                </Column>

            </Columns>

            <Columns centered>

                <Tile
                    title={ "Samen wählen" }
                    icon={ "seed-bag" }>
                    <p>Spreche mit uns über E-Mail ab, was du gerne säen möchtest. Der <i>Bereich Grünflächen</i> sponsert dir gern auch Samen.</p>
                </Tile>

                <Tile
                    title={ "Pachtvertrag unterz." }
                    icon={ "contract" }>
                    <p>Der Vertrag legt fest, dass du die Pflege für deine Brachfläche übernimmst und berechtigt dich zum Begrünen des Areals.</p>
                </Tile>

                <Tile
                    title={ "Beet Aufbereitung" }
                    icon={ "potsdam" }>
                    <p>Der <i>Bereich Grünflächen</i> bereitet deine gewählte Brachfläche auf, füllt Blumenerde auf und baut ein kleines Zäunchen für dich.</p>
                </Tile>

                <Tile
                    title={ "Säe und Staune!" }
                    icon={ "sow" }>
                    <p>
                        <strong>April 2021:</strong> Der beste Zeitpunkt deine Pflanzen und Samen auf deinem vorbereitetem Beet einzupflanzen 🌻
                    </p>
                </Tile>
            </Columns>

        </Interferer>
    )
}

export default Join;