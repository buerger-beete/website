import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect, useState } from "react";
import Axios from "axios";

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";
import Heading from "react-bulma-components/lib/components/heading/heading";
import Content from "react-bulma-components/lib/components/content/content";
import { cn } from "reusable-components/dist/helper";

import MAP_ICON_SRC from "../../../../assets/icons/map.svg";
import { findPolygonCenter } from "../../../../helper";

import Interferer from "../../../ui/molecule/interferer/Interferer";
import GoogleMap from "./google-maps/GoogleMap";
import LocationList from "./location-list/LocationList";
import Styles from "./Map.module.scss";


function getLocations (kmlData) {
	let locations = [];

	if (kmlData) {
		const placemarks = kmlData.querySelectorAll("Folder > Placemark");

		placemarks.forEach(mark => {
			const title = mark.querySelector("name")?.firstChild?.wholeText?.trim();
			const description = mark.querySelector("description")?.firstChild?.wholeText?.trim();
			const shapePoints = mark.querySelector("coordinates")?.firstChild?.wholeText
				.replaceAll(" ", "")
				.split("\n")
				.filter(row => row.length)
				.map(row => {
					const [lng, lat] = row.split(",");

					return {
						lng: Number.parseFloat(lng),
						lat: Number.parseFloat(lat),
					};
				});

			const center  = findPolygonCenter(shapePoints);

			locations.push({
				title,
				description,
				center,
				shapePoints
			});
		});

		locations = locations.sort((a, b) => a.title > b.title);
	}

	return locations;
}

const Map = () => {
	const { markdownRemark } = useStaticQuery(graphql`
		query {
            markdownRemark(fileAbsolutePath: {regex: "//content/markdown-pages/map/locations.md/"}) {
                frontmatter {
                    title
                    kmlSource
                    defaultLocation {
	                    lat
	                    lng
                    }
                }
            }
        }
	`);

	const [selectedLocation, setSelectedIndex] = useState(0);
	const [kmlData, setKmlData] = useState(null);

	useEffect(() => {
		Axios
			.get(markdownRemark.frontmatter.kmlSource, {
				headers: { "Content-Type": "application/xml" }
			})
			.then(response => {
				const parser = new DOMParser();
				const parsedXml = parser.parseFromString(response.data, "text/xml");
				setKmlData(parsedXml);
			});
	}, []);

	// aggregate location data from kml data
	const locations = kmlData ? getLocations(kmlData) : [];

	return (
		<Interferer
			id={ "map" }
			containerClassName={ Styles.wrapper }
			className={ Styles.section }>

			<Columns
				centered
				vCentered
				className={ Styles.columns }>

				<Column
					className={ Styles.description }
					size={ 6 }
					tablet={ {
						size: 8
					} }
					desktop={ {
						size: 5
					} }
					fullhd={ {
						size: 3
					} }>

					<img
						src={ MAP_ICON_SRC }
						alt="Icon: Blumenbeet"
						className={ Styles.icon }
					/>

					<Heading
						size={ 1 }
						textAlignment={ "centered" }>
						Karte <br/>
					</Heading>

					<Content textAlignment={ "centered" }>
						Hier siehst du die bereits belegten Baumscheiben und Beete auf dem Bassinplatz. Und was ist mit deinem Beet? ;-)
					</Content>
				</Column>

			</Columns>

			<Columns
				className={ Styles.container }>

				<Column
					className={ cn(
						Styles.tile,
						Styles.locationList
					) }>

					<LocationList
						selectedLocation={ selectedLocation }
						onSelect={ setSelectedIndex }
						locations={ locations }
					/>

				</Column>

				<Column className={ Styles.tile }>

					{ locations.length &&
						<GoogleMap
							kmlSource={ markdownRemark.frontmatter.kmlSource }
							onSelect={ setSelectedIndex }
							selectedLocationIndex={ selectedLocation }
							defaultLocation={ markdownRemark.frontmatter.defaultLocation }
							locations={ locations }
						/>
					}

				</Column>
			</Columns>
		</Interferer>
	);
};

Map.propTypes = {};
Map.defaultProps = {};

export default Map;