import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, StatusBar as BarStatus } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './navigation/Stack';

export const App = () => {
  return (
    <View 
      style={styles.container}
    >
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <StatusBar 
        style='auto'
        backgroundColor="#fff"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});