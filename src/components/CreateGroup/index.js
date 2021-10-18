import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  Animated,
  Keyboard
} from 'react-native';

import { height, SPACING, sizeTheme } from '../../common/GlobalStyle';
import { Colors } from '../../constants/Colors';
import { addData, updateOne } from '../../services/group';


export const CreateGroup = ({ onCancel, isVisible, itemData }) => {
  const initialPositionModal = (height * 0.5) - (sizeTheme.HEIGHT_MODAL_GROUP / 2);

  const [heightContainer, setHeightContainer] = useState(null);
  const [positionYModal, setPositionYModal] = useState(
    new Animated.Value(initialPositionModal)
  );
  const [input, setInput] = useState('');
  const [initInput, setInitInput] = useState(false);
  
  
  useEffect(() => {
    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', keyboardDidShow
      );
    const KeyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', keyboardDidHide
      );
      
    

    return () => {
      KeyboardDidHideListener.remove();
      KeyboardDidShowListener.remove();
    }
  }, []);

  useEffect(() => {
    setInput(!!itemData.NOME ? itemData.NOME : '')
  }, [isVisible])

  const keyboardDidShow = () => {
    Animated.timing(positionYModal, {
      toValue: (height * 0.3) - (sizeTheme.HEIGHT_MODAL_GROUP / 2),
      duration: 100,
      useNativeDriver: false,
    }).start();
  }

  const keyboardDidHide = () => {
    Animated.timing(positionYModal, {
      toValue: (height * 0.5) - (sizeTheme.HEIGHT_MODAL_GROUP / 2),
      duration: 100,
      useNativeDriver: false,
    }).start();
  }

  const saveGroup = () => {
    if (input.trim().length > 0) addData(input);
    onCancel(false);
  }

  const upadateGroup = () => {
    console.log("UPDATE");
    if (input.trim().length > 0 && !!itemData.ID) updateOne(itemData.ID, input);
    onCancel(false);
  }

  const clearStates = () => {
    onCancel(false);
  }

  return (
    <Modal
      onRequestClose={onCancel}
      visible={isVisible}
      animationType='slide'
      transparent={true}
    >
      <TouchableOpacity
        activeOpacity={0.96}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
        onPress={clearStates}
      >
      </TouchableOpacity>
      <Animated.View
        style={{
          flex: 1,
          position: 'absolute',
          left: '5%',
          top: positionYModal,
          backgroundColor: '#EEE',
          width: '90%',
          height: 145.71,
          padding: SPACING,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10
          }}
        >
          Nome do grupo muscular:
        </Text>
        <TextInput 
          value={input}
          onChangeText={(text) => setInput(text)}
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            paddingLeft: 5,
            fontSize: 13,
            borderRadius: 8,
            height: 35
          }}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primaryLite,
              width: 100,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8
            }}
            onPress={() => { 
              if (!itemData.ID) saveGroup();
              if (itemData.ID) upadateGroup();
            }}
          >
            <Text
              style={{
                color: Colors.white,
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <StatusBar 
        style="auto"
        backgroundColor="rgba(0, 0, 0, 0.6)"
      />
    </Modal>
  )
}
