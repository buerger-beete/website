import React from "react";

import Button from "react-bulma-components/lib/components/button/button";
import {getMailLink} from "../../../../helper";


const ContactButton = ({ label = "Mehr Infos", ...props }) => {
    return (
        <Button
            color={ "primary" }
            size={ "medium" }
            renderAs={ "a" }
            href={ getMailLink() }
            { ...props }>

            { label }

        </Button>
    );
}

export default  ContactButton;