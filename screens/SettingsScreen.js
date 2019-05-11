/*
My Music Tutor
Made by Ryan Niemi
Date: 5/9/19
Description:
	A settings feature that allows someone to manage their account. Their username, first name, last name, zip code, instruments that are played, and email.
*/


import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };


  changeUsername () => {

  }

  sendHelpRequest() => {

  }




  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
