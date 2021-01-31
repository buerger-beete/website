import React from "react";

import Section from "react-bulma-components/lib/components/section/section";
import Container from "react-bulma-components/lib/components/container/container";

import Styles from "./Interferer.module.scss";
import {cn} from "reusable-components/dist/helper";


const Interferer = ({
    id,
    hasTransitionTop = false,
    hasTransitionBottom = false,
    fullSize = false,
    children,
    containerClassName,
    className,
    ...props
}) => {
    return (
        <Section
            id={ id }
            className={ cn(
                Styles.section,
                hasTransitionTop && Styles.hasTransitionTop,
                hasTransitionBottom && Styles.hasTransitionBottom,
                className
            ) }
            { ...props }>
            { fullSize ?
                children:
                <Container className={ containerClassName }>
                    { children }
                </Container>
            }
        </Section>
    );
}

export default Interferer;