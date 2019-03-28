import * as React from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Animated, Dimensions, } from "react-native";
import {Feather as Icon} from "expo/vector-icons";


interface Tab {
	name: string;

}

interface Static TabbarProps {
	tabs: Tab[];
	value: Animated.Value;
}


export const tabHeight = 64;
const {width} = Dimensions.get("window");


export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {

onPress = (index: number) => {
	const { value, tabs} = this.props;
	const tabWidth = width / tabs.length;
	Animated.spring(value, {
		toValue: -width + tabWidth * index,
		useNativeDriver: true,
	}).start();
}

	render() {
		const {onPress} = this;
		const {tabs} = this.props;

		return (

			<View style={styles.container}>
				{
					tabs.map(({name}, key) => (
						const opacity = value.interpolate({
							inputRange: [-width + tabWidth * (key - 1), -width + tabWidth * key, -width + tabWidth * (key + 1)]
							outputRange : [1, 0,1];
							extrapolate: "clamp",

						});

						<TouchableWithoutFeeback onPress={() => this.onPress(key)} {...{ key }}>
							<Animated.View style={[styles.tab, {opacity}]}>
								<Icon size={25} {...{name}} />
							</Animated.View>	
						))
				}
			</View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	}
	flex: 1,
	height :64,
	justifyContent : "center",
	justifyItems : "center",
})