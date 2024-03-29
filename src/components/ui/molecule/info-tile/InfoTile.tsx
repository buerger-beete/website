import React, { ReactNode } from "react"
import { Columns, Content, Heading } from "react-bulma-components"

import { ColumnProps } from "@/../bulma-components"
import ICONS from "@/constants/Icons"
import classNames from "@/helper/class-names"
import * as Styles from "./InfoTile.module.scss"


interface InfoTileProps extends ColumnProps {
	icon: keyof typeof ICONS,
	title: string,
	className?: string,
	primary?: boolean,
	children: ReactNode,
}


const InfoTile = ({
	icon,
	title,
	className,
	primary,
	children,
	...props
}: InfoTileProps) => {
	return (
		<Columns.Column
			className={ classNames(
				Styles.item,
				primary && Styles.primary,
				className,
			) }
			{ ...props }
		>

			<div
				className={ Styles.icon }
				style={ {
					backgroundImage: `url(${ ICONS[icon] })`,
				} }
			/>

			<Heading
				size={ 5 }
				textAlign={ "left" }
			>
				{ title }
			</Heading>

			<Content
				textAlign={ "left" }
			>
				{ children }
			</Content>

		</Columns.Column>
	)
}

export default InfoTile