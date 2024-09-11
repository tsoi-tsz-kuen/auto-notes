import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const CircularImageButton = ({ imageSource, onPress, size = 60 }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#ddd', // 按鈕背景顏色
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 999, // 讓圖片也圓形
  },
});

export default CircularImageButton;