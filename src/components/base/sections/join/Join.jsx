import React from "react";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";

import Heading from "react-bulma-components/lib/components/heading/heading";

import PATCH_FLOWERED_ICON_SRC from "../../../../assets/icons/patch-flowered.svg";

import Styles from "./Join.module.scss";
import Interferer from "../../../ui/molecule/interferer/Interferer";
import InfoTile from "../../../ui/molecule/info-tile/InfoTile";


const Tile = ({ title, icon, primary, children }) =>
    <InfoTile
        title={ title }
        icon={ icon }
        primary={ primary }
        desktop={ {
            size: 3
        } }
        tablet={ {
            size: 4
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

            <Columns
                className={ Styles.columns }
                multiline
                centered>

                <Tile
                    title={ "Samen & Areal" }
                    icon={ "seed-bag" }>
                    <p>Spreche mit uns über E-Mail ab, was und wo du gerne säen möchtest. Der <i>Bereich Grünflächen</i> sponsert dir nach Absprache auch Samen.</p>
                </Tile>

                <Tile
                    title={ "Pflegevereinbarung" }
                    icon={ "contract" }>
                    <p>Unterschreibe die von uns zugeschickte Vereinbarung. Sie berechtigt dich zum Begrünen des Areals. <a href={ "/files/pdf/Pflegevereinbarung-Muster.pdf" } download>→
                        Mustervertrag</a></p>
                </Tile>

                <Tile
                    title={ "Beet Aufbereitung" }
                    icon={ "potsdam" }>
                    <p>Der <i>Bereich Grünflächen</i> bereitet deine gewählte Brachfläche auf und baut eine kleine Beetbegrenzung für dich – du kannst dir auch ein eigenes Zäunchen bauen!</p>
                </Tile>

                <Tile
                    title={ "Säe und Staune!" }
                    icon={ "sow" }
                    primary>
                    <p>
                        <strong>April 2021:</strong> Der beste Zeitpunkt deine Pflanzen und Samen auf deinem vorbereitetem Beet einzupflanzen 🌻
                    </p>
                </Tile>
            </Columns>

        </Interferer>
    )
}

export default Join;