import React from "react";
import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";
import { cn } from "reusable-components/dist/helper";

import Styles from "./LocationList.module.scss";


const LocationList = ({ onSelect, selectedLocation, locations }) => {
	return (
		<ul className={ Styles.list }>
			{ locations.map((location, index) =>
				<li
					key={ index }
					onClick={ () => onSelect(index) }
					className={ cn(
						Styles.item,
						selectedLocation === index && Styles.active
					) }>

					<Heading
						size={ 4 }
						className={ Styles.title }>
						{ location.title }
					</Heading>

					{ location.description &&
						<Content
							size={ 6 }
							className={ Styles.content }>
							{ location.description }
						</Content>
					}
				</li>
			) }
		</ul>
	);
};

LocationList.propTypes = {};
LocationList.defaultProps = {};

export default LocationList;