import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';


const CHeader = () => {
  return (
   <View style={styles.container} >
    <Text>OverView</Text>

   </View>
  );
};

const styles = StyleSheet.create({
    container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000', 
    width : '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 999, // 讓圖片也圓形
  },
});

export default CHeader;