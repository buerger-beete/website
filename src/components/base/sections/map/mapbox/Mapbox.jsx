import React, { Component } from "react"
import { cn } from "reusable-components/dist/helper"
import PropTypes from "prop-types"

import "mapbox-gl/dist/mapbox-gl.css"
import { Marker, Cluster, ZoomControl, Map as Factory } from "react-mapbox-gl"

import * as Styles from "./Mapbox.module.scss"


const MAP_STYLE_URL = "mapbox://styles/buergerbeete/ckm7ocbrw2dxm18rwh8x4f7sn"

const Map = Factory({
	accessToken:
		"pk.eyJ1IjoiYnVlcmdlcmJlZXRlIiwiYSI6ImNra2l1M2VjdTFxbHcycHF0NjJ2ZWw4OG4ifQ.KV1348L3w2Tn5QIsJ1ct-g",
})

export default class Mapbox extends Component {
	static propTypes = ({
		selectedLocationIndex: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		defaultLocation: PropTypes.array.isRequired,
		locations: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			location: PropTypes.array.isRequired,
			color: PropTypes.string,
		})).isRequired,
	})

	mapInstance = null

	constructor(props) {
		super(props)

		this.state = {
			center: props.defaultLocation,
			zoom: undefined,
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (
			prevProps.selectedLocationIndex !== this.props.selectedLocationIndex &&
			this.mapInstance !== null
		) {
			const { location } = this.props.locations[this.props.selectedLocationIndex]
			this.jumpToLocation(location)
		}
	}

	getColor(position) {
		return `hsl(${ Math.floor(255 * position) }, 100%, 50%)`
	}

	jumpToLocation(location) {
		this.mapInstance.flyTo({
			center: location,
			zoom: 19,
			essential: true,
		})
	}

	renderClusterMarker(coordinates, pointsCount) {
		return (
			<DotMarker
				key={ `${ coordinates[0] }-${ coordinates[1] }` }
				coordinates={ coordinates }
				dotLabel={ pointsCount }
				isClusterer
			/>
		)
	}

	onMarkerClick(index) {
		this.props.onSelect(index)
	}

	onMapLoaded(map) {
		this.mapInstance = map
	}

	render() {
		const fitBounds = this.props.locations.map(({ location }) => location)

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
				onClick={ (_, map) => console.log(`[${ map.lngLat.lng }, ${ map.lngLat.lat }]`) }
				renderChildrenInPortal={ true }
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
							color={ this.getColor(index / this.props.locations.length) }
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

const DotMarker = ({
	coordinates,
	dotLabel,
	label,
	color,
	isClusterer,
	selected,
	onClick,
}) => {
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