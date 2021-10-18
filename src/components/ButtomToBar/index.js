import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../Icons';
import { Colors } from '../../constants/Colors';

export const ToBarButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Icon 
        type={item.type} 
        name={focused ? item.activeIcon : item.inActiveIcon}
        color={Colors.black}
        size={35}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})