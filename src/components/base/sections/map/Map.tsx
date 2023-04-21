import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Button, Columns, Content, Heading } from "react-bulma-components"

import MAP_ICON_SRC from "@/assets/icons/map.svg"
import classNames from "@/helper/class-names"
import { Flowerbed, PageData } from "@/pages"

import Interferer from "../../../ui/molecule/interferer/Interferer"
import LocationList from "./location-list/LocationList"

import * as Styles from "./Map.module.scss"
import Mapbox from "@/components/ui/molecule/mapbox/Mapbox"


interface MapQuery extends PageData {
	mapConfig: {
		frontmatter: {
			defaultLocation: [ number, number ]
		}
	};
}


const Map = () => {
	const {
		participants,
		mapConfig,
	}: MapQuery = useStaticQuery(graphql`
		query {
			participants: markdownRemark(fileAbsolutePath: {regex: "//content/data/participants/index.md/"}) {
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

			mapConfig: markdownRemark(fileAbsolutePath: {regex: "//content/map/index.md/"}) {
				frontmatter {
					defaultLocation
				}
			}
		}
	`)

	const [ selectedLocation, setSelectedIndex ] = useState(0)
	const [ isScrollZoomEnabled, setScrollZoomEnabled ] = useState(false)

	// aggregate location data from kml data
	const locations = participants.frontmatter.participants.reduce((aggr: Array<Flowerbed>, next) => {
		for (const flowerbed of next.flowerbeds) {
			aggr.push(flowerbed)
		}

		return aggr
	}, [])

	const defaultLocation = mapConfig?.frontmatter?.defaultLocation || [ 52, 11 ]

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
						alt={ "" }
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
						Wir haben bereits <b>{ locations.length }&nbsp;Beete&nbsp;und&nbsp;Baumscheiben</b> in&nbsp;Potsdam&nbsp;vergeben 😍!
					</Content>
				</Columns.Column>

			</Columns>

			<Columns
				className={ Styles.container }
			>
				<Columns.Column
					className={ classNames(
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
					<Button
						color={ !isScrollZoomEnabled ? "primary" : "danger" }
						size={ "small"}
						style={ {
							position: "absolute",
							zIndex: 100,
							top: "1rem",
							left: "50%",
							transform: "translateX(-50%)",
						} }
						onClick={ () => {
							setScrollZoomEnabled(!isScrollZoomEnabled)
						} }
					>
						Scroll-Zoom { !isScrollZoomEnabled ? "erlauben" : "verbieten" }
					</Button>

					{ locations.length &&
						<Mapbox
							isScrollZoomEnabled={ isScrollZoomEnabled }
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