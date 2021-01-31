import React, { Component } from "react";
// import PropTypes from "prop-types";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
	accessToken:
		'pk.eyJ1IjoiYnVlcmdlcmJlZXRlIiwiYSI6ImNra2l1M2VjdTFxbHcycHF0NjJ2ZWw4OG4ifQ.KV1348L3w2Tn5QIsJ1ct-g'
});

export default class Mapbox extends Component {
	static propTypes = {};

	static defaultProps = {};

	render () {
		return (
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				containerStyle={{
					width: '100%',
					height: '80vh',
				}}
			>
				<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
					<Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
				</Layer>
			</Map>
		);
	}
}
