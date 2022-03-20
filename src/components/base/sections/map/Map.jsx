import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Columns, Heading, Content } from "react-bulma-components"
import { cn } from "reusable-components/dist/helper"

import MAP_ICON_SRC from "../../../../assets/icons/map.svg"

import Interferer from "../../../ui/molecule/interferer/Interferer"
import LocationList from "./location-list/LocationList"
import Mapbox from "./mapbox/Mapbox"

import * as Styles from "./Map.module.scss"


const Map = () => {
	const {
		participants,
		mapConfig,
	} = useStaticQuery(graphql`
		query {
			participants: markdownRemark(fileAbsolutePath: {regex: "//content/markdown-pages/data/participants/index.md/"}) {
				frontmatter {
					participants {
						name
						flowerbeds {
							title
							imagesDir
							description
							location
						}
					}
				}
			}

			mapConfig: markdownRemark(fileAbsolutePath: {regex: "//content/markdown-pages/map/index.md/"}) {
				frontmatter {
					defaultLocation
				}
			}
		}
	`)

	const [ selectedLocation, setSelectedIndex ] = useState(0)

	// aggregate location data from kml data
	const locations = participants?.frontmatter?.participants?.reduce((aggr, next) => {
		for (const flowerbed of next.flowerbeds) {
			aggr.push(flowerbed)
		}

		return aggr
	}, []) || []

	const defaultLocation = mapConfig?.frontmatter?.defaultLocation || [52, 11]

	return (
		<Interferer
			id={ "map" }
			containerClassName={ Styles.wrapper }
			className={ Styles.section }
		>

			<Columns
				centered
				vCentered
				className={ Styles.columns }
			>

				<Columns.Column
					className={ Styles.description }
					size={ 6 }
					tablet={ {
						size: 8,
					} }
					desktop={ {
						size: 5,
					} }
					fullhd={ {
						size: 3,
					} }
				>

					<img
						src={ MAP_ICON_SRC }
						alt="Icon: Blumenbeet"
						className={ Styles.icon }
					/>

					<Heading
						size={ 1 }
						textAlign={ "centered" }
					>
						Karte <br />
					</Heading>

					<Content
						textAlign={ "centered" }
						textColor={ "dark" }
					>
						Wir haben bereits <b>{ locations.length } Beete und Baumscheiben</b> in Potsdam vergeben 😍! Wir
						warten sehnsüchtig auf deine Anfrage&nbsp;😋.
					</Content>
				</Columns.Column>

			</Columns>

			<Columns
				className={ Styles.container }
			>

				<Columns.Column
					className={ cn(
						Styles.tile,
						Styles.locationList,
					) }
				>

					<LocationList
						selectedLocation={ selectedLocation }
						onSelect={ setSelectedIndex }
						locations={ locations }
					/>

				</Columns.Column>

				<Columns.Column className={ Styles.tile }>

					{ locations.length &&
						<Mapbox
							onSelect={ setSelectedIndex }
							selectedLocationIndex={ selectedLocation }
							defaultLocation={ defaultLocation }
							locations={ locations }
						/>
					}

				</Columns.Column>
			</Columns>
		</Interferer>
	)
}

export default Map