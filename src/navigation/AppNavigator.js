import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ReelsScreen from '../screens/ReelsScreen';
import StoryScreen from '../screens/StoryScreen';
import NotificationScreen from './../screens/NotificationScreen';
import ProfileScreen from './../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import { Image, View } from 'react-native';
import colors from '../constants/colors';
import Feeds from '../components/Feeds';
import Stories from '../components/Stories';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false,  
            tabBarStyle: {
                position: 'absolute', 
                backgroundColor: colors.bgColor,
                borderTopWidth: 1,
                borderTopColor: '#333',
                height: 60,
                justifyContent: 'center',
                // marginTop: -10,
            },
            tabBarShowLabel: false
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={
                        focused
                            ? require('D:/sahil/react_native/Instagram_clone/src/assets/icons/Home.png')
                            : require('D:/sahil/react_native/Instagram_clone/src/assets/icons/Home(1).png')}
                        style={{ width: 25, height: 25 }} />
                )
            }} />

            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/search.png')}
                        style={{
                            width: 25, height: 25, tintColor: focused ? '#ffffff' : '#999999',
                            shadowColor: focused ? '#000000' : 'transparent',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: focused ? 0.3 : 0,
                            shadowRadius: focused ? 4 : 0,
                        }} />
                )
            }} />
            <Tab.Screen name="ReelsScreen" component={ReelsScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={
                            focused
                                ? require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel(1).png')
                                : require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel.png')}
                        style={{
                            width: 28,
                            height: 28,
                        }}
                    />
                )
            }} />

            <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={
                            focused
                                ? require('D:/sahil/react_native/Instagram_clone/src/assets/icons/notification(1).png')
                                : require('D:/sahil/react_native/Instagram_clone/src/assets/icons/notification.png')
                        }
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                )
            }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        padding: 2,
                        borderRadius: 50,
                        borderWidth: focused ? 1 : 0,
                        borderColor: focused ? colors.fontColor : colors.fontColor,
                        }}>
                        <Image
                        source={require('D:/sahil/react_native/Instagram_clone/src/assets/images/profile.png')}
                        style={{    
                            width: 25,
                            height: 25,
                            borderRadius: 50,
                        }}
                        />
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}
const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false, orientation:'portrait'}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="StoryScreen" component={StoryScreen} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Feeds" component={Feeds} />
            <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
        </Stack.Navigator>
    );
}

export default AppNavigator

