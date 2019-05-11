import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import CalendarStrip from 'react-native-slideable-calendar-strip';


<CalendarStrip
  selectedDate={this.state.selectedDate}
  onPressDate={(date) => {
    this.setState({ selectedDate: date });
  }}
  onPressGoToday={(today) => {
    this.setState({ selectedDate: today });
  }}
  onSwipeDown={() => {
    alert('onSwipeDown');
  }}

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
//fetch date
  markedDate={[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`, `${year}-${month}-${date.setDate(day + 1)}`, `${year}-${month}-${date.setDate(day + 2)}`, `${year}-${month}-${date.setDate(day + 3)}`, `${year}-${month}-${date.setDate(day + 4)}`, `${year}-${month}-${date.setDate(day + 5)}`, `${year}-${month}-${date.setDate(day + 6)}`]}
/>
