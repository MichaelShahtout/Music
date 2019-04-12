import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View>
                <Image src="./components/images/users/${usr}.jpg" onError="a">
                </Image>
                <Text class="Text">
                    ${usrName}
                    <Text>
                    </Text>
            </View>
                );
    
        };
    };