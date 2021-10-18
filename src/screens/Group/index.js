import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList,
  Animated
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { Icon, Icons } from '../../components/Icons';
import { Colors } from '../../constants/Colors';
import { MARGIN_STATUS_BAR, SPACING, width, sizeTheme } from '../../common/GlobalStyle';
import { CreateGroup } from '../../components/CreateGroup';
import { findAll, deleteOne } from '../../services/group';
const { RADIUS } = sizeTheme;

export const Group = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSwaip, setLoadingSwaip] = useState(false);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState({});
  const [open, setOpen] = useState([]);
  const valueBorderRad = useRef(new Animated.Value(RADIUS)).current;

  const EditButtom = () => {

    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          height: 60,
          width: width * 0.15,
          justifyContent: 'center',
          borderTopLeftRadius: RADIUS,
          borderBottomLeftRadius: RADIUS,
          alignItems: 'center',
        }}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Icon 
          name="edit"
          type={Icons.FontAwesome}
          size={30}
          color="#FFF"
        />
      </TouchableOpacity>
    )
  }
  
  const DeleteButtom = (props) => {
    
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.red,
          height: 60,
          width: width * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: RADIUS,
          borderBottomRightRadius: RADIUS,
        }}
        onPress={() => {
          if (itemData.ID) deleteOne(itemData.ID);
          setLoading(!loading);
        }}
      >
        <Icon 
          name="edit"
          type={Icons.FontAwesome}
          size={30}
          color="#FFF"
        />
      </TouchableOpacity>
    )
  }

  const removeElement = (arr, index) => {
    setLoadingSwaip(true);
    let newArr = [];
    for (const iterator of arr) {
      if (index !== iterator) newArr.push(iterator);
    }
    setOpen(() => newArr);
  }

  useEffect(() => {
    findAll().then((resp) => {
      if (resp._array) setData(resp._array)
    }).catch((err) => {
      console.log(err);
    })
  }, [showModal, loading]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
      > 
      <CreateGroup 
        isVisible={showModal}
        onCancel={setShowModal}
        itemData={itemData}
      />
      <View
        style={{
          flex: 0.2,
          marginTop: MARGIN_STATUS_BAR + SPACING,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
        <Text
          style={{
            padding: SPACING,
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: SPACING
          }}
          >
          Group
        </Text>
        <TouchableOpacity
          style={{
            padding: SPACING,

          }}
          onPress={() => {
            setItemData({});
            setShowModal(true);
          }}
        >
          <Icon 
            name="add"
            type={Icons.Ionicons}
            size={50}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: SPACING * 0.5,
        }}
      >
        <FlatList 
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            padding: SPACING,
          }}
          renderItem={({ item, index }) => {
            
            return (
              <Swipeable
                renderLeftActions={EditButtom}
                renderRightActions={DeleteButtom}
                overshootLeft={false}
                overshootRight={false}
                overshootFriction={3}
                onSwipeableRightWillOpen={() => {
                  setItemData(item);
                }}

                onSwipeableLeftWillOpen={() => {
                  if (!showModal) setItemData(item);
                }}

                onSwipeableWillOpen={() => {
                  const arrOpen = [...open];

                  if (!arrOpen.includes(index)) arrOpen.push(index);
                  setOpen(() => arrOpen);
                  
                  valueBorderRad.setValue(0);
                }}

                onSwipeableWillClose={() => {
                  removeElement([...open], index);

                  if (loadingSwaip) valueBorderRad.setValue(RADIUS);
                  setLoadingSwaip(false);
                }}
                 
                useNativeAnimations={true}
              >
                <Animated.View
                  style={
                    {
                      width: '100%',
                      height: 60,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      marginBottom: SPACING * 0.1,
                      padding: SPACING,
                      borderRadius: open.includes(index) ? valueBorderRad : RADIUS,
                    }
                  }
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#fff',
                      paddingLeft: width * 0.15,
                    }}
                  >
                    {item.NOME}
                  </Text>
                </Animated.View>
              </Swipeable>
            )
          }}
        />
      </View>
    </View>
  )
}
