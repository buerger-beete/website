import React from "react"
import { Button } from "react-bulma-components"

import { getMailLink } from "@/helper"


interface ContactButtonProps {
	label: string,
	size?: "small" | "normal" | "medium" | "large",
	disabled?: boolean,
	outlined?: boolean,
	color?: string,
}


const ContactButton = ({ label = "Mehr Infos", size, ...props }: ContactButtonProps) => {
	const _size = size === "normal" ? undefined : size

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