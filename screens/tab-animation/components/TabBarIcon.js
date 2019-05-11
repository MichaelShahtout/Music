/*
My Music Tutor
Made by Ryan Niemi
Date: 5/9/19
Description:
  A tabbar used at the bottom of the app to navigate between the messenging app, the calendar booking, The explore page, their collections page, and thier home profile page 
  Creds to: can it be done in react: React tabbar animation
*/


import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}