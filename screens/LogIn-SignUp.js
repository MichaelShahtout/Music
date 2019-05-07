import React, {Component} from 'react';
import {
    Image,
    BackgroundImage
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    RegisterApp
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return {
            <View>
                <BackgroundImage source={../components/blob-shape3.svg} onError={../components/whiteImage.svg}>    
                    <Image src={require("../components/images/users/${usr}.png")} onError={require("../components/images/users/profile.png")}>
                    <Text styles="Text">
                        ${usrName}
                    </Text>
                    <Text styles="Text">
                        You are succesfully logged in!
                    </Text>

                    <Route to="../home">
                    Return to home
                    </Route>
                </BackgroundImage>
            </View>
                };
    
        };

        let styles = StyleSheet.create(
            Text: {
                font-size: 46em,
                font-family: calibri,
                font-color: #ecee3e,
            } 
        );
    };

    React.RegisterApp("ProfileScreen");