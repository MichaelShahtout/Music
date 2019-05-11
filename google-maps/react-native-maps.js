import React. {Component, Platform} from 'react';
import haversine from 'haversine';
import navigator from 'react-native-maps';

class GeoLoactionMap extends React.Component({

	constructor(props) {
		super(props);

		this.state = {
			latitude: LATITUDE,
			longitude: LONGITUDE,
			routeCoordinates: [],
			distanceTravelled: 0,
			prevLatLng: {},
			coordinate: new AnimatedReion({
				latitude: LATITUDE,
				longitude: LONGITUDE
			})
		};
	}

	calcDistance = newLatLng => {
		const {prevLatLng} = this.state;
		return haversine(prevLatLng, newLatLng) || 0;
	};

	getMapRegion = () => ({
		latitude: this.state.latitude,
		longitude: this.state.longitude,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA
	});

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition(
			position => {
				const { coordinate, routeCoordinates, distanceTravelled} = this.state;
				const {latitude, longitude} = position.coords;

				const newCoordinate = {
					latitude,
					longitude
				};

				if (Platform.OS === "android") {
					if (this.marker) {
						this.marker._component.animateMarkerToCoordinate( newCoordinate, 500)''
					}
					else {
						coordinate.timing(newCoordinate).start();
					}
					this.setState({
						latitude,
						longitude,
						routeCoordinates: routeCoordinates.concat([newCoordinate]),
						distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate)
					});
				},
				error => console.log("error"),
				{enableHighAccuracy: true,
					timeout: 20000, maximumAge: 1000}

				 if (Platform.OS === "android") {
				 	if (this.marker) {
				 		this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
				 	}
				 } else {
				 	coordinate.timing(newCoordinate).start();

				 	this.setState({
				 		latitude,
				 		longitude,
				 		routeCoordinates: routeCoordinates.concat([newCoordinate]),
				 		distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
				 		prevLatLng: newCoordinate
				 	});
				 }
			}
		);
	}

		render() {
			return (
				<MapView 
					style={styles.map}
					showUserLocation
					followUserLocation
					loadingEnabled
					region={this.getMapRegion()}
				>

					<Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> 

					<Marker.AnimatedReion
						ref={marker => {
							this.marker = marker;
						}}
						coordinate={this.state.coordinate}
						/>
				</MapView>

				<View style={styles.buttonContainer}> 
					<TouchableOpacity 
						style={[styles.bubble, styles.button]}
					>

						<Text  style={styles.bottomBarContent}> 
							{parseFloat(this.state.distanceTravelled).toFixed(2)} km 
						</Text>

					</TouchableOpacity>
				</View>
			)
		}
});