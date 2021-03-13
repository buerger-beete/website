import React, {Component} from "react";
import PropTypes from "prop-types";
import { Loader } from "@googlemaps/js-api-loader";
import MarkerClusterer from "@googlemaps/markerclustererplus";

import Styles from "./GoogleMap.module.scss";


export default class GoogleMap extends Component {
	static DEFAULT_SHAPE_STYLE = {
		strokeColor: "#FFFFFF",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FFFFFF",
		fillOpacity: 0.5
	};

	static ACTIVE_SHAPE_STYLE = {
		strokeColor: "#05a054",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#05a054",
		fillOpacity: 0.4
	};

	static MAP_STYLES = [
		{
			"featureType": "poi",
			"stylers": [
				{ "visibility": "off" }
			]
		}
	];

	static propTypes = {
		selectedLocationIndex: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		kmlSource: PropTypes.string.isRequired,
		defaultLocation: PropTypes.object.isRequired,
		locations: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string.isRequired,
			center: PropTypes.object.isRequired,
			shapePoints: PropTypes.array.isRequired
		})).isRequired
	};

	static defaultProps = {};

	mapRef = React.createRef();
	_map = null;
	_markers = [];
	_kmlLayer = null;

	_shapes = [];
	state = {
		mapLoaded: false
	};

	async componentDidMount () {
		await this.loadMap();
		this.addPolygons();
		this.fitMarkersIntoView();

		new MarkerClusterer(this._map, this._markers, {
			imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
		});
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		const currIndex = this.props.selectedLocationIndex;

		if (currIndex !== null && prevProps.selectedLocationIndex !== currIndex) {
			this.resetPolygonStyles();
			this.navigateToLocation(currIndex);
			this.openInfoWindow(currIndex);
		}
	}

	resetPolygonStyles () {
		for (let i = 0; i < this._shapes.length; i++) {
			this._shapes[i].setOptions({
				...GoogleMap.DEFAULT_SHAPE_STYLE
			});
		}
	}

	navigateToLocation (index) {
		const location = this.props.locations[index];

		// set styles for active shape
		this._shapes[index].setOptions({
			...GoogleMap.ACTIVE_SHAPE_STYLE
		});

		// navigate to location
		this._map.panTo(location.center);

		// zoom in
		if (this._map.getZoom() < 19) {
			this._map.setZoom(19);
		}
	}

	async loadMap () {
		const {
			defaultLocation
		} = this.props;

		const loader = new Loader({
			apiKey: "AIzaSyD-Q7obnuf5zd22o5dQvRvr-9VWMXer7B0",
			version: "weekly"
		});

		// load map
		await loader.load();

		let center = { ...defaultLocation };

		// recenter to a location when location is already set
		const selectedLocationIndex = this.props.selectedLocationIndex;
		if (selectedLocationIndex && this.props.locations[selectedLocationIndex]) {
			center = this.props.locations[selectedLocationIndex].position;
		}

		this._map = new window.google.maps.Map(this.mapRef.current, {
			center,
			zoom: 18,
			mapTypeId: "satellite",
			mapTypeControl: false,
			streetViewControl: false,
			styles: GoogleMap.MAP_STYLES
		});

		this._map.setTilt(20);

		this.setState({
			...this.state,
			mapLoaded: true
		});
	}

	addPolygons () {
		this._markers = new Array(this.props.locations.length);

		for (let i = 0; i < this.props.locations.length; i++) {
			const { shapePoints, center, title } = this.props.locations[i];
			const area = new window.google.maps.Polygon({
				paths: shapePoints,
				...GoogleMap.DEFAULT_SHAPE_STYLE
			});

			area.addListener("click", () => this.props.onSelect(i));

			area.setMap(this._map);
			this._shapes.push(area);

			// save markers for later
			this._markers[i] = this.addMarker(center, title, i);
		}
	}

	addMarker (position, title, index) {
		const marker = new window.google.maps.Marker({
			position,
			title
		});

		marker.addListener("click", () => this.props.onSelect(index));
		marker.setMap(this._map);

		return marker;
	}

	render () {
		return (
			<div
				ref={ this.mapRef }
				className={ Styles.map }
			/>
		);
	}

	fitMarkersIntoView () {
		let padding = 10;

		if (window.innerWidth > 769) {
			padding = { left: 300 };
		}

		const bounds = new window.google.maps.LatLngBounds();

		for (const { center } of this.props.locations) {
			bounds.extend(
				new window.google.maps.LatLng(center)
			);
		}

		this._map.fitBounds(
			bounds,
			padding
		);
	}

	openInfoWindow (locationIndex) {
		const {
			center,
			title
		} = this.props.locations[locationIndex];

		const infoWindow = new window.google.maps.InfoWindow({
			content: `
				<h1>${ title }</h1>
			`,
		});

		infoWindow.open(this._map, center);
	}
}