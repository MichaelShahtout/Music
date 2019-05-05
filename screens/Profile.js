'use strict';


import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AppRegistry,
    Button,
    TouchableHighlight,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'stretch',
            }}>
                <View style={styles.topDiv}> 
                    <ImageBackground source={ false ? 
                            require("../components/users/images/${usr}.png"):
                            require("../componets/users/images/profile.png");                        }
                      } 
                    position="CENTER">
                        <Text style={styles.Text}>
                            ${name}
                        </Text>

                    </ImageBackground>
                    </View>

                   onPressSignOut = () => {
                    <Route to={/api/signout}> 
                        Signing Out
                    </Route>
                   } 
                <TouchableHighlight style={styles.ButtonContainer}>
                    <Image style={styles.button} source={{ uri: { require('whiteImagee') } } >
                        </Image>
                    </TouchableHighlight>
                <Button onPress={onPressSignOut} title="Sign Out" accessibilityLabel="Sign out of your account" style={{ background-image: radial-gradient(circle, #34e342, #00d7ae, #00c0ff, #009dff, #6d61ff),}}>
                    </Button>
                <View style={styles.bottomDiv}>
                </View>
            </View>
                );
    
        };
    };
                            AppRegistry.registerComponent('ProfileScreen', () => ProfileScreen );


          
  _handleLearnMorePress = () => {
                    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
                };
              
  _handleHelpPress = () => {
                    WebBrowser.openBrowserAsync(
                        'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
                    );
                };
              };
              


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(227, 66, 52, 0.4)',
    },
    Text: {
        fontFamily: "FreeMono",
        font: "monospace",
        fontSize: 18,
        alignContent: "center",
        paddingVertical: 7,
        shadowColor: "rgba(114,106,149, 0.4)",
        shadowOpacity: 40,
    },

    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(244,232,193,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
                color: 'rgba(96,100,109, 1)',
                lineHeight: 24,
                textAlign: 'center',
            },
           .bottomDiv: {
                            background - image: linear-gradient(to bottom, #e35f34, #e75243, #e94653, #e83c63, #e33473),
                            height: 60,
                       },
            .topDiv: {
                            background - image: linear-gradient(to top, #e35f34, #e75243, #e94653, #e83c63, #e33473),
                            height: 60,
                    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },

    .backgroundImage: {
        background-repeat: no-repeat,
    },
    ButtonContainer: {
             height: 128,
             width: 128,
            borderRadius: 64,
            background - image: radial - gradient(circle, #34e342, #00d7ae, #00c0ff, #009dff, #6d61ff),
    },
    button: {
            height: 128,
            width: 128,
            borderRadius: 64,
    },
});
