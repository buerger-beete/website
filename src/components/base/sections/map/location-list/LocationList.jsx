import React from "react";
import PropTypes from "prop-types";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";
import { cn } from "reusable-components/dist/helper";
import { getContrast } from "../../../../../helper/colors"

import Styles from "./LocationList.module.scss";


export default class LocationList extends React.Component {
	static propTypes = {
		onSelect: PropTypes.func.isRequired,
		selectedLocation: PropTypes.number.isRequired,
		locations: PropTypes.array.isRequired
	};

	_itemRefs = [];

	handleItemClick (index) {
		this.scrollIntoView(index);
		this.props.onSelect(index);
	}

	scrollIntoView (index) {
		const current = this._itemRefs[index]?.current;

		if (current) {
			scrollIntoView(current, {
				behavior: "smooth",
				block: "nearest",
				scrollMode: "if-needed",
				boundary: document.querySelector("#map")
			});
		}
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		this.scrollIntoView(this.props.selectedLocation);
	}

	getColor (position, luminance) {
		return `hsl(${ Math.floor(255 * position) }, 100%, ${ luminance }%)`
	}

	render () {
		const {
			selectedLocation,
			locations
		} = this.props;

		this._itemRefs = locations.map(() => React.createRef());

		return (
			<ul className={ Styles.list }>
				{ locations.map(({ title, description }, index) => {
					const isActive = selectedLocation === index

					const color = this.getColor(
						index / locations.length,
						isActive ? 30 : 50
					)

					const textColor = getContrast(color)

					return (
						<li
							key={ index }
							ref={ this._itemRefs[index] }
							onClick={ () => this.handleItemClick(index) }
							className={ cn(
								Styles.item,
								selectedLocation === index && Styles.active
							) }
							style={ {
								backgroundColor: color
							} }
						>
							<Heading
								size={ 5 }
								style={ { color: textColor } }
								className={ Styles.title }>
								{ title }
							</Heading>

							{ description &&
							<Content
								renderAs={ "p" }
								textSize={ 6 }
								style={ { color: textColor } }
								className={ Styles.content }>
								{ description }
							</Content>
							}
						</li>
					)
				} ) }
			</ul>
		);
	}
}