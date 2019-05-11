import React, {Component} from 'react';

import {
	AlertIOS,
	StyleSheet,
	Text,
	TouchableHighlight,
	View, 
	NativeModules
} from 'react-native';

import TouchID from 'react-native-touch-id';

class FingerPrint extends React.Component {

	const optionalConfigObject = {
		title: "Authentication Required",
		color: "#e00606",
		fallbackLabel: "Show Passcode"
	};

	pressHandler() {
		TouchID.authenticate('to use this component', optionalConfigObject)
		.then(success => {
			AlertIOS.alert('Authenticated Successfully');
		})
		.catch(error => {
			AlertIOS.alert("Authentication Failed");
		})

	}

	render() {
		return (
			<View> 

				<TouchableHighlight onPress={this.pressHandler}> 
					<Text>
						Authenticate with Touch ID
					</Text>
				</TouchableHighlight>
			</View>	
		);
	}
};