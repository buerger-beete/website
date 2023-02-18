import { ReactNode } from "react"

import { Container, Section } from "react-bulma-components"
import { cn } from "reusable-components/dist/helper"

import * as Styles from "./Interferer.module.scss"


interface InterfererProps {
	id?: string,
	hasTransitionTop?: boolean,
	hasTransitionBottom?: boolean,
	fullSize?: boolean,
	children?: ReactNode,
	backgroundColor?: string,
	containerClassName?: string,
	className?: string
}


const Interferer = ({
	id,
	hasTransitionTop = false,
	hasTransitionBottom = false,
	fullSize = false,
	children,
	containerClassName,
	className,
	backgroundColor,
}: InterfererProps) => {
	return (
		<Section
			id={ id }
			className={ cn(
				Styles.section,
				hasTransitionTop && Styles.hasTransitionTop,
				hasTransitionBottom && Styles.hasTransitionBottom,
				className,
			) }
			backgroundColor={ backgroundColor }
		>
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