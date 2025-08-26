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
import ProfileScreen from '../screens/ProfilePages/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import { Image, View } from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MentionDetails from '../components/ProfileComponents/ProfileMentions/MentionDetails';
import ProfileHighlightStory from '../components/ProfileComponents/ProfileHighlightStory';
import user from './../data/userData';
import EditProfileScreen from '../screens/ProfilePages/EditProfileScreen';
import shareProfilePage from '../screens/ProfilePages/shareProfilePage';
import msgScreen from '../components/msgScreen/msgScreen';
import CommentsPage from '../components/FunctionalityPages/CommentsPage';
import SendPage from '../components/FunctionalityPages/SendPage';
import NewPostScreen from './../screens/NewPostScreen';
import UserProfileScreen from '../screens/ProfilePages/UserProfileScreen';
import msgProfile from '../components/msgScreen/msgProfile';
import ProfileTabs from './ProfileTabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false,  
            tabBarStyle: {
                position: 'absolute', 
                backgroundColor: colors.bgColor,
                borderTopWidth: 1,
                borderTopColor: colors.borderTopColor,
                height: 60,
                justifyContent: 'center',
                display:'flex',
                // marginTop: -10,
            },
            tabBarHideOnKeyboard:true,
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
                    <Ionicons name={focused ?'search':'search-outline'} color={'white'} size={25}/>
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
                        source={{uri:user.profileImage}}
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
        <Stack.Navigator initialRouteName='Home'screenOptions={{ headerShown: false, orientation:'portrait'}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="StoryScreen" component={StoryScreen} />
            <Stack.Screen name="Home" component={MainTabNavigator} />
            <Stack.Screen name="MentionDetails" component={MentionDetails} />
            <Stack.Screen name="ProfileHighlightStory" component={ProfileHighlightStory} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="shareProfilePage" component={shareProfilePage} />
            <Stack.Screen name="msgScreen" component={msgScreen} />
            <Stack.Screen name="CommentsPage" component={CommentsPage} />
            <Stack.Screen name="SendPage" component={SendPage} />
            <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="msgProfile" component={msgProfile} />
            <Stack.Screen name="ProfileTabs" component={ProfileTabs} />
            
        </Stack.Navigator>
    );
}

export default AppNavigator

