import React, { useRef, useState } from 'react';
import { View, Text, Button, PanResponder, PermissionsAndroid, Alert, Linking, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';

const { FloatingSubtitleModule } = NativeModules;

const App = () => {
    const [position, setPosition] = useState({ x: 100, y: 100 }); // 初始位置
    const [isVisible, setIsVisible] = useState(true); // 字幕可见性状态

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                // 更新位置
                setPosition({
                    x: position.x + gestureState.dx,
                    y: position.y + gestureState.dy,
                });
            },
            onPanResponderRelease: () => {
                // 可选：可以在释放时执行其他操作
            },
        })
    ).current;

    const requestOverlayPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
                {
                    title: '浮动窗口权限',
                    message: '应用需要显示浮动窗口的权限',
                    buttonNeutral: '稍后询问',
                    buttonNegative: '取消',
                    buttonPositive: '确定',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('浮动窗口权限已被授予');
            } else {
                console.error('浮动窗口权限被拒绝');
                Alert.alert('权限未授予', '请在设置中授予浮动窗口权限', [
                    { text: '取消', style: 'cancel' },
                    { text: '去设置', onPress: openSettings },
                ]);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const openSettings = () => {
        Linking.openSettings();
    };

    const startFloatingService = async () => {
        const permission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW);
        if (permission) {
            if (FloatingSubtitleModule) {
                FloatingSubtitleModule.startService("这是新的浮动字幕内容！");
                console.log('浮动服务已启动');
            } else {
                console.error('FloatingSubtitleModule 是 null');
            }
        } else {
            Alert.alert('权限未授予', '请在设置中授予浮动窗口权限');
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible); // 切换字幕的可见性
    };

    return (
        <View style={styles.container}>
            {isVisible && (
                <View
                    {...panResponder.panHandlers}
                    style={[styles.floatingSubtitle, { left: position.x, top: position.y }]}
                >
                    <Text style={styles.subtitleText}>长按并拖动我</Text>
                </View>
            )}
            <View style={styles.controlContainer}>
                <Button title={isVisible ? "隐藏字幕" : "显示字幕"} onPress={toggleVisibility} />
            </View>
            <Button title="启动浮动字幕服务" onPress={startFloatingService} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingSubtitle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    subtitleText: {
        color: '#fff',
    },
    controlContainer: {
        marginTop: 20,
    },
});

export default App;