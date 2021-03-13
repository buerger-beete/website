import React from "react";
import PropTypes from "prop-types";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";
import { cn } from "reusable-components/dist/helper";

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

	render () {
		const {
			selectedLocation,
			locations
		} = this.props;

		this._itemRefs = locations.map(() => React.createRef());

		return (
			<ul className={ Styles.list }>
				{ locations.map((location, index) =>
					<li
						key={ index }
						ref={ this._itemRefs[index] }
						onClick={ () => this.handleItemClick(index) }
						className={ cn(
							Styles.item,
							selectedLocation === index && Styles.active
						) }>

						<Heading
							size={ 5 }
							className={ Styles.title }>
							{ location.title }
						</Heading>

						{ location.description &&
							<Content
								renderAs={ "p" }
								textSize={ 6 }
								className={ Styles.content }>
								{ location.description }
							</Content>
						}
					</li>
				) }
			</ul>
		);
	}
}