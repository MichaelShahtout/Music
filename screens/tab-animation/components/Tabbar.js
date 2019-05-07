import * as React from 'react';
import { View, SafeAreaView, Dimensions, Animated} from "react-native";
import {Svg} from "expo";
import * as shape from "d3-shape";

import StaticTabbar from "./StaticTabbar";

const tabs = [
{name : "bell"},
{name : "calendar"},
{name : "bookmark"},
{name : "box"},
{name : "user"}]


const {width} = Dimensions.get("window");

const tabWidth = width / tabs.length;
const height = 64;
const {Path } = Svg;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tab = shape.line()
.x(d=> d.x)
.y(d=> d.y)
.curve(shape.curveBasis)([
	{x : width, y : 0},
	{x : width + 5, y: 0},
	{x : width + 10, y : 10},
	{x : width + tabWidth - 15, y: height },
	{x: width + tabWidth - 10, y : 10 },
	{x : width + tabWidth - 5, y : 0},
	{x: width + tabWidth, y:0},
	])

const left = shape.line()
.x(d => d.x)
.y(d => d.y)
([
{x : 0, y : 0},
{x : width, y: 0},
]);

const right = shape.line()
.x(d => d.x)
.y(d => d.y)
([
{x : width + tabWidth, y : 0},
{x : width * 2, y : 0},
{x : 0, y: height},
{x : 0, y: 0},
]);

const d = `${left} ${tab} ${right}`;

interface TabbarProps {}

value = new Animated.Value(0);

export default class Tabbar extends React.PureComponent<TabbarProps> {
			const {value} = this


	render() {
		const {value: translateX} = this;
	return (
	<>
	<View {...{ width, height}}>
	<AnimatedSvg width={width * 2} {...{height }} style={{transform: [{translateX}] }}>
	<Path {... {d } fill="white"} />
	</AnimatedSvg>
	<View style={StyleSheet.absoluteFill}>
		<StaticTabbar value= {translateX} {...{tabs}} /> 
		</View>
	<SafeAreaView style={styles.safeArea} />
	)
	}
}