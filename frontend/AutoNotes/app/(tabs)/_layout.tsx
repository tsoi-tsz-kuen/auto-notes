import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '@/components/Icons';
import   Colors from '@/constants/ColorBar';

import * as Animatable from 'react-native-animatable';

import HomeScreen from '@/app/(tabs)/Home/index';
import TakeNoteScreen from '@/app/(tabs)/TakeNote/index';
import NotesScreen from '@/app/(tabs)/Notes/index';

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: HomeScreen, color: Colors.primary, alphaClr: Colors.primaryAlpha },
  { route: 'Search', label: 'Search', type: Icons.Feather, icon: 'search', component: TakeNoteScreen, color: Colors.green, alphaClr: Colors.greenAlpha },
  { route: 'Add', label: 'Add New', type: Icons.Feather, icon: 'plus-square', component: NotesScreen, color: Colors.red, alphaClr: Colors.redAlpha },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  
  useEffect(() => {
    if (viewRef.current && textViewRef.current) { // 确保 ref 不为空
      if (focused) {
        viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      } else {
        viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      }
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.primary} />
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: Colors.white, paddingHorizontal: 8
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function AnimTab3() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            width: '65%',
            position: 'absolute',
            margin: 16,
            
            borderRadius: 16,
            alignItems: 'center',
          
        
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
})