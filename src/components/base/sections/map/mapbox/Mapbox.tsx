import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component, ReactElement } from "react"
import { Cluster, Map as Factory, Marker, ZoomControl } from "react-mapbox-gl"
import { cn } from "reusable-components/dist/helper"
import colors from "../location-list/colors"

import * as Styles from "./Mapbox.module.scss"


const MAP_STYLE_URL = "mapbox://styles/buergerbeete/ckm7ocbrw2dxm18rwh8x4f7sn"

const Map = Factory({
	accessToken:
		"pk.eyJ1IjoiYnVlcmdlcmJlZXRlIiwiYSI6ImNra2l1M2VjdTFxbHcycHF0NjJ2ZWw4OG4ifQ.KV1348L3w2Tn5QIsJ1ct-g",
})


interface MapboxProps {
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


export default class Mapbox extends Component<MapboxProps, MapboxState> {
	mapInstance: mapboxgl.Map | null = null

	constructor (props: MapboxProps) {
		super(props)

		this.state = {
			center: props.defaultLocation,
			zoom: undefined,
		}
	}

	componentDidUpdate (prevProps: MapboxProps, prevState: MapboxState) {
		if (
			prevProps.selectedLocationIndex !== this.props.selectedLocationIndex &&
			this.mapInstance !== null
		) {
			const { location } = this.props.locations[this.props.selectedLocationIndex]
			this.jumpToLocation(location)
		}
	}

	getColor (position: number) {
		return colors[Math.floor(position * colors.length)]
	}

	jumpToLocation (location: [ number, number ]) {
		this.mapInstance!.flyTo({
			center: location,
			zoom: 19,
			essential: true,
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
	}

	render () {
		const fitBounds: [ number, number ][] = this.props.locations.map(({ location }) => location)

		const selectedLocationCenter = this.props.locations[this.props.selectedLocationIndex]?.location
		const center = selectedLocationCenter || this.state.center

		const windowWidth = typeof window !== "undefined" && window.innerWidth

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
					zoomOnClickPadding={ windowWidth < 769 ?
						30 : // default padding
						{ left: 500, right: 30 }
					}
				>
					{ this.props.locations.map(({ title, location, color }, index) =>
						<DotMarker
							key={ location.join("-") }
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
				className={ cn(
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