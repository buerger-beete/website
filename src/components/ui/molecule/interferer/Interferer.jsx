import React from "react"

import { Section, Container } from "react-bulma-components"
import { cn } from "reusable-components/dist/helper"

import * as Styles from "./Interferer.module.scss"


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
				className,
			) }
			{ ...props }>
			{ fullSize ?
				children :
				<Container className={ containerClassName }>
					{ children }
				</Container>
			}
		</Section>
	)
}

export default Interferer