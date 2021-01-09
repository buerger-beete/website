import React from "react";

import Button from "react-bulma-components/lib/components/button/button";
import {getMailLink} from "../../../../helper";


const ContactButton = ({ label = "Mehr Infos", size, ...props }) => {
    let _size = size === "normal" ? undefined : size;

    return (
        <Button
            color={ "primary" }
            size={ _size }
            renderAs={ "a" }
            href={ getMailLink() }
            { ...props }>

            { label }

        </Button>
    );
}

export default  ContactButton;