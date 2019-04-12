import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Tabbar from "./components/Tabbar"

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ea3345',
    justifyContent: 'flex-end',
  },
});
