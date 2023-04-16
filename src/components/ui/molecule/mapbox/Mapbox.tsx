import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component, ReactElement } from "react"
import { Cluster, Map as Factory, Marker, ZoomControl } from "react-mapbox-gl"

import classNames from "@/helper/class-names"
import { MAPBOX_STYLE_URL, MAPBOX_TOKEN } from "@/helper/constants"
import colors from "@/components/base/sections/map/location-list/colors"
import * as Styles from "./Mapbox.module.scss"


const MAP_STYLE_URL = MAPBOX_STYLE_URL

const Map = Factory({
	accessToken: MAPBOX_TOKEN,
})

interface MapboxProps {
	isScrollZoomEnabled?: boolean,
	selectedLocationIndex: number,
	onSelect: (index: number) => void,
	defaultLocation: [ number, number ],
	locations: {
		title: string,
		description: string,
		imagesDir?: string,
		location: [ number, number ],
		color?: string,
	}[],
}


interface MapboxState {
	center: [ number, number ],
	zoom?: number,
}

const MAP_DESKTOP_PADDING = {
	left: 400,
	right: 40,
	top: 40,
	bottom: 40,
}


export default class Mapbox extends Component<MapboxProps, MapboxState> {
	mapInstance: mapboxgl.Map | null = null

	constructor (props: MapboxProps) {
		super(props)

		console.log("MAP", MAP_STYLE_URL, MAPBOX_TOKEN)

		this.state = {
			center: props.defaultLocation,
			zoom: undefined,
		}
	}

	componentDidUpdate (prevProps: MapboxProps) {
		if (
			prevProps.selectedLocationIndex !== this.props.selectedLocationIndex &&
			this.mapInstance !== null
		) {
			const { location } = this.props.locations[this.props.selectedLocationIndex]
			this.jumpToLocation(location)
		}

		this.updateControlStates()
	}

	private updateControlStates () {
		if (!this.mapInstance) {
			return
		}

		if (this.props.isScrollZoomEnabled) {
			this.mapInstance?.scrollZoom.enable()
		} else {
			this.mapInstance?.scrollZoom.disable()
		}
	}

	getColor (position: number) {
		return colors[Math.floor(position * colors.length)]
	}

	jumpToLocation (location: [ number, number ]) {
		if (typeof window === "undefined") {
			console.error("window is not defined")
			return false;
		}

		if (!this.mapInstance) {
			console.error("Mapbox instance is not defined")
			return false;
		}

		const windowWidth = window.innerWidth

		this.mapInstance.flyTo({
			center: location,
			zoom: 19,
			essential: true,
			padding: windowWidth < 769
				? 30
				: MAP_DESKTOP_PADDING
		})
	}

	renderClusterMarker (coordinates: [ number, number ], pointsCount: number) {
		return (
			<DotMarker
				key={ `${ coordinates[0] }-${ coordinates[1] }` }
				coordinates={ coordinates }
				dotLabel={ pointsCount }
				isClusterer
			/>
		)
	}

	onMarkerClick (index: number) {
		this.props.onSelect(index)
	}

	onMapLoaded (map: mapboxgl.Map) {
		this.mapInstance = map

		this.updateControlStates()
	}

	render () {
		const fitBounds: [ number, number ][] = this.props.locations.map(({ location }) => location)

		const selectedLocationCenter = this.props.locations[this.props.selectedLocationIndex]?.location
		const center = selectedLocationCenter || this.state.center

		if (typeof window === "undefined") {
			console.error("window is not defined");
			return null;
		}

		const windowWidth = window.innerWidth

		return (
			<Map
				style={ MAP_STYLE_URL }
				className={ Styles.map }
				center={ center }
				zoom={ this.state.zoom ?
					[ this.state.zoom ] :
					undefined
				}
				onStyleLoad={ map => this.onMapLoaded(map) }
				renderChildrenInPortal={ true }
				fitBoundsOptions={ windowWidth < 769
					? { padding: 20 }
					: { padding: MAP_DESKTOP_PADDING }
				}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				fitBounds={ selectedLocationCenter ?
					undefined :
					fitBounds
				}
			>
				<Cluster
					ClusterMarkerFactory={ this.renderClusterMarker }
					extent={ 1000 }
					radius={ 180 }
					maxZoom={ 17 }
					zoomOnClick
					zoomOnClickPadding={ windowWidth < 769
						? 30
						: MAP_DESKTOP_PADDING
					}
				>
					{ this.props.locations.map(({ title, location, color }, index) =>
						<DotMarker
							key={ location.join("-") + index }
							coordinates={ location }
							label={ title }
							color={ color || this.getColor(index / this.props.locations.length) }
							selected={ this.props.selectedLocationIndex === index }
							onClick={ () => this.onMarkerClick(index) }
						/>,
					) }
				</Cluster>

				<ZoomControl />
			</Map>
		)
	}
}


interface DotMarkerProps {
	coordinates: [ number, number ],
	dotLabel?: ReactElement | number | string,
	label?: string,
	color?: string,
	isClusterer?: boolean,
	selected?: boolean,
	onClick?: () => void,
}


const DotMarker = ({
	coordinates,
	dotLabel,
	label,
	color,
	isClusterer,
	selected,
	onClick,
}: DotMarkerProps) => {
	const style = {
		backgroundColor: color,
	}

	return (
		<Marker coordinates={ coordinates }>
			<div
				className={ classNames(
					Styles.markerContainer,
					isClusterer && Styles.clusterer,
					selected && Styles.selected,
				) }
				onClick={ onClick }
			>
				<div
					className={ Styles.marker }
					style={ style }
				>
					{ dotLabel &&
						<h4 className={ Styles.dotLabel }>
							{ dotLabel }
						</h4>
					}

					{ label &&
						<p className={ Styles.label }>
							{ label }
						</p>
					}
				</div>

				<div className={ Styles.pulsate } />
			</div>
		</Marker>
	)
}