import React, { Component } from "react";
import PropTypes from "prop-types";
import { Loader } from "@googlemaps/js-api-loader";

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
	_kmlLayer = null;

	_shapes = [];
	state = {
		mapLoaded: false
	};

	async componentDidMount () {
		await this.loadMap();
		this.addPolygons();
		this.navigateToLocation(this.props.selectedLocationIndex);
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		const currIndex = this.props.selectedLocationIndex;

		if (currIndex !== null && prevProps.selectedLocationIndex !== currIndex) {
			this.resetPolygonStyles();
			this.navigateToLocation(currIndex);
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
		for (let i = 0; i < this.props.locations.length; i++) {
			const { shapePoints } = this.props.locations[i];
			const area = new window.google.maps.Polygon({
				paths: shapePoints,
				...GoogleMap.DEFAULT_SHAPE_STYLE
			});

			area.addListener("click", () => this.props.onSelect(i));

			area.setMap(this._map);
			this._shapes.push(area);
		}
	}

	render () {
		return (
			<div
				ref={ this.mapRef }
				className={ Styles.map }
			/>
		);
	}
}