import React from "react"
import { Button } from "react-bulma-components"

import { getMailLink } from "../../../../helper"


const ContactButton = ({ label = "Mehr Infos", size, ...props }) => {
	let _size = size === "normal" ? undefined : size

	return (
		<Button
			color={ "primary" }
			size={ _size }
			textSize={ 5 }
			renderAs={ "a" }
			href={ props.disabled ? undefined : getMailLink() }
			{ ...props }>

			{ label }

		</Button>
	)
}

export default ContactButton