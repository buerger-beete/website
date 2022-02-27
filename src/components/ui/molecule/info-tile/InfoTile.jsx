import React from "react"
import PropTypes from "prop-types"

import { Columns, Heading, Content } from "react-bulma-components"

import ICONS from "../../../../constants/Icons"
import * as Styles from "./InfoTile.module.scss"
import { cn } from "reusable-components/dist/helper"


const InfoTile = ({ icon, iconAlt, title, className, primary, children, ...props }) => {
	return (
		<Columns.Column
			className={ cn(
				Styles.item,
				primary && Styles.primary,
				className,
			) }
			{ ...props }>

			<div
				className={ Styles.icon }
				style={ {
					backgroundImage: `url(${ ICONS[icon] })`,
				} }
			/>

			<Heading
				size={ 5 }
				textAlign={ "centered" }
			>
				{ title }
			</Heading>

			<Content
				textAlign={ "centered" }
			>
				{ children }
			</Content>

		</Columns.Column>
	)
}

InfoTile.propTypes = {
	icon: PropTypes.oneOf([
		"contract",
		"join",
		"patch-flowered",
		"patch-raw",
		"seed-bag",
		"sow",
		"potsdam",
	]).isRequired,
	title: PropTypes.string.isRequired,
}

export default InfoTile