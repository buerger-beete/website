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
                    title={ "Brachfläche wählen" }
                    icon={ "patch-raw" }>
                    <p>Wähle eine Brachfläche auf dem Bassinplatz aus und teile sie uns mit … oder lass dir einfach eine von uns zuweisen.</p>
                </Tile>

                <Tile
                    title={ "Saatgut wählen" }
                    icon={ "seed-bag" }>
                    <p>Du hast eigene Samen? Super! Sprech sie kurz mit uns ab. Oder noch keine Idee? Wir haben für dich eine große Auswahl in petto!</p>
                </Tile>

                <Tile
                    title={ "Pachtvertrag unterz." }
                    icon={ "contract" }>
                    <p>Keine Sorge, dieser Vertrag legt lediglich fest, dass du die gewählte Brachfläche begrünen darfst und kann binnen 4 Wochen aufgelöst werden.</p>
                </Tile>

                <Tile
                    title={ "Säet und Staunet!" }
                    icon={ "sow" }>
                    <p>
                        <strong>Anfang April ’21</strong> gehen wir zusammen auf den Bassinplatz und bepflanzen die Beete zusammen mit dem <i>Bereich Grünfächen.</i>
                    </p>
                </Tile>
            </Columns>

        </Interferer>
    )
}

export default Join;