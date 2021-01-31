import React from "react";
import PropTypes from "prop-types";

import Column from "react-bulma-components/lib/components/columns/components/column";

import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";

import ICONS from "../../../../constants/Icons";
import Styles from "./InfoTile.module.scss";
import {cn} from "reusable-components/dist/helper";


const InfoTile = ({ icon, iconAlt, title, className, primary, children, ...props }) => {
    return (
        <Column
            className={ cn(
                Styles.item,
                primary && Styles.primary,
                className
            ) }
            { ...props }>

            <div
                className={ Styles.icon }
                style={ {
                    backgroundImage: `url(${ ICONS[icon] })`
                } }
            />

            <Heading
                size={ 5 }
                textAlignment={ "centered" }>
                { title }
            </Heading>

            <Content
                textAlignment={ "centered" }>
                { children }
            </Content>

        </Column>
    );
}

InfoTile.propTypes = {
    icon: PropTypes.oneOf([
        "contract",
        "join",
        "patch-flowered",
        "patch-raw",
        "seed-bag",
        "sow",
        "potsdam"
    ]).isRequired,
    title: PropTypes.string.isRequired
};

export default InfoTile;