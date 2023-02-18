import React, { RefObject } from "react"

import { Content, Heading } from "react-bulma-components"

import { cn } from "reusable-components/dist/helper"
import scrollIntoView from "smooth-scroll-into-view-if-needed"
import { getContrast } from "../../../../../helper/colors"
import { Flowerbed } from "../../../../../pages"
import colors from "./colors"

import * as Styles from "./LocationList.module.scss"


interface LocationListProps {
	onSelect: (index: number) => void,
	selectedLocation: number,
	locations: Flowerbed[],
}


export default class LocationList extends React.Component<LocationListProps> {
	_itemRefs: Array<RefObject<HTMLLIElement>> = []

	handleItemClick (index: number) {
		this.scrollIntoView(index)
		this.props.onSelect(index)
	}

	scrollIntoView (index: number) {
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

	componentDidUpdate () {
		this.scrollIntoView(this.props.selectedLocation)
	}

	getColor (position: number) {
		return colors[Math.floor(position * colors.length)]
	}

	render () {
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