import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import { ToBarTabs } from './screens';
import { Icon } from '../../components/Icons';
import { Colors } from '../../constants/Colors';
import { sizeTheme } from '../../common/GlobalStyle';
import { ToBarButton } from '../../components/ButtomToBar';


const Tab = createBottomTabNavigator();
const { SPACING, RADIUS } = sizeTheme;

export const ToBar = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: SPACING,
          right: SPACING,
          left: SPACING,
          borderRadius: RADIUS,
        }
      }}
    >
      {ToBarTabs.map((item, index) => {
        return (
          <Tab.Screen 
            key={index.toString()}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarButton: (props) => <ToBarButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}