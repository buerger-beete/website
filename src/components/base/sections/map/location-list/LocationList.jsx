import React from "react"
import PropTypes from "prop-types"
import scrollIntoView from "smooth-scroll-into-view-if-needed"

import { Heading, Content } from "react-bulma-components"

import { cn } from "reusable-components/dist/helper"
import { getContrast } from "../../../../../helper/colors"

import * as Styles from "./LocationList.module.scss"
import colors from "./colors";


export default class LocationList extends React.Component {
	static propTypes = {
		onSelect: PropTypes.func.isRequired,
		selectedLocation: PropTypes.number.isRequired,
		locations: PropTypes.array.isRequired,
	}

	_itemRefs = []

	handleItemClick(index) {
		this.scrollIntoView(index)
		this.props.onSelect(index)
	}

	scrollIntoView(index) {
		const current = this._itemRefs[index]?.current

		if (current) {
			scrollIntoView(current, {
				behavior: "smooth",
				block: "nearest",
				scrollMode: "if-needed",
				boundary: document.querySelector("#map"),
			})
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.scrollIntoView(this.props.selectedLocation)
	}

	getColor(position) {
		return colors[Math.floor(position * colors.length)]
	}

	render() {
		const {
			selectedLocation,
			locations,
		} = this.props

		this._itemRefs = locations.map(() => React.createRef())

		return (
			<ul className={ Styles.list }>
				{ locations.map(({ title, description }, index) => {
					const isActive = selectedLocation === index

					const color = this.getColor(
						index / locations.length,
					)

					const textColor = getContrast(color)

					return (
						<li
							key={ index }
							ref={ this._itemRefs[index] }
							onClick={ () => this.handleItemClick(index) }
							className={ cn(
								Styles.item,
								isActive && Styles.active,
							) }
							style={ {
								backgroundColor: color,
							} }
						>
							<Heading
								size={ 5 }
								className={ Styles.title }
								style={ {
									color: textColor,
								} }
							>
								{ title }
							</Heading>

							{ description &&
								<Content
									renderAs={ "p" }
									textSize={ 6 }
									className={ Styles.content }
									style={ {
										color: textColor,
									} }
								>
									{ description }
								</Content>
							}
						</li>
					)
				}) }
			</ul>
		)
	}
}