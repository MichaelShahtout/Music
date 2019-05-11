/*
My Music Tutor
Made by Ryan Niemi
Date: 5/9/19
Version: 1.0.0
Description:
    A component for a profile screen. It has a blob as a background image,
    a picture of you,
    your username,
    a brief description/content
    a text showing that you are logged in,
    a link to return to home 
*/


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
                        You are logged in!
                    </Text>
                    <Text styles="Text">
                    {user.component}
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