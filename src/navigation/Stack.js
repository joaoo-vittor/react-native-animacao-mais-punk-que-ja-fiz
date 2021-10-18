import React from 'react';
import { Text, View } from 'react-native';
import { 
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';

import { ToBar } from '../navigation/ToBar';
import { Group } from '../screens/Group';
import { Sistema } from '../screens/Sistema';
import { Exercicio } from '../screens/Exercicio';

const Stack = createStackNavigator();

const options = {
  gestureEnable: true,
  gestureDirection: 'horizontal',
  headerShown: false,
}

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName="ToBar"
    >
      <Stack.Screen 
        name="ToBar"
        component={ToBar}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Grupo"
        component={Group}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Sistema"
        component={Sistema}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Exercicio"
        component={Exercicio}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}