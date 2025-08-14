import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfilePosts from '../components/ProfileComponents/ProfilePosts';
import ProfileReels from '../components/ProfileComponents/ProfileReels';
import ProfileMentions from '../components/ProfileComponents/ProfileMentions/ProfileMentions';
import { Image } from 'react-native';
import colors from '../constants/colors';



const Tab = createMaterialTopTabNavigator();

const ProfileTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false, // No text, like Instagram
                tabBarIndicatorStyle: {
                    backgroundColor: 'white',
                    height: 2,
                    width: 75,           
                    marginLeft: '7%',
                },

                tabBarStyle: { backgroundColor: colors.bgColor }, // match profile bg
            }}
        >
            <Tab.Screen name="Posts" component={ProfilePosts}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={
                            focused
                                ? require('D:/sahil/react_native/Instagram_clone/src/assets/icons/profilePosts.png')
                                : require('D:/sahil/react_native/Instagram_clone/src/assets/icons/profilePosts(1).png')}
                            style={{
                                width: 22,
                                height: 22,
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen name="Reels" component={ProfileReels}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={
                            focused
                                ? require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel(1).png')
                                : require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel.png')}
                            style={{
                                width: 27,
                                height: 27,
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen name="Mentions" component={ProfileMentions}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={
                            focused
                                ? require('D:/sahil/react_native/Instagram_clone/src/assets/icons/Mentions.png')
                                : require('D:/sahil/react_native/Instagram_clone/src/assets/icons/Mentions(1).png')}
                            style={{
                                width: 25,
                                height: 30,
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default ProfileTabs;
