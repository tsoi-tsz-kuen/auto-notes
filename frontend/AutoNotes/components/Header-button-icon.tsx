import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons  from '@expo/vector-icons/Ionicons';

const IconButtonWithBadge = ({ iconName, onPress, badgeCount }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name={iconName} size={30} color="#fff" />
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#007bff', // 按鈕背景顏色
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'yellow', // 標籤背景顏色
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff', // 標籤邊框顏色
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000', // 標籤文字顏色
  },
});

export default IconButtonWithBadge;