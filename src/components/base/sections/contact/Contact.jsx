import React from "react";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";

import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";

import ButtonGroup from "react-bulma-components/lib/components/button/components/button-group";

import Styles from "./Contact.module.scss";
import Interferer from "../../../ui/molecule/interferer/Interferer";
import ICONS from "../../../../constants/Icons";
import {getMailLink} from "../../../../helper";
import ContactButton from "../../../ui/atom/contact-button/ContactButton";


const Contact = () => {
    return (
        <Interferer id={ "join" }>

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
                        src={ ICONS.join }
                        alt="Icon: Kontaktiere uns!"
                        className={ Styles.icon }
                    />

                    <Heading
                        size={ 1 }
                        textAlignment={ "centered" }>
                        Du hast Interesse?
                    </Heading>

                    <Content
                        className={ Styles.text }
                        textAlignment={ "centered" }>
                        <p>Das ist super! Schreib uns eine unverbindliche E-Mail an <a href={ getMailLink() }><strong>info@buerger-beete.de</strong></a> mit deinen Ideen. Wir schicken dir darauf weitere Informationen zu.</p>
                        <p><strong>Wir freuen uns auf dich!</strong></p>
                    </Content>

                    <ButtonGroup position={ "centered" }>
                        <ContactButton
                            label={ "Unverb. E-Mail schreiben" }
                        />
                    </ButtonGroup>
                </Column>

            </Columns>
        </Interferer>
    )
}

export default Contact;