// navigation/ProfileTabs.js
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../constants/colors';
import ProfileTabIcon from './../components/ProfileComponents/ProfileTabIcon';

const Tab = createMaterialTopTabNavigator();

const ProfileTabs = ({ tabsConfig }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                    backgroundColor: 'white',
                    height: 2,
                    width: 75,
                    marginLeft: '7%',
                },
                tabBarStyle: { backgroundColor: colors.bgColor },
            }}
        >
            {tabsConfig.map(tab => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <ProfileTabIcon
                                focused={focused}
                                activeIcon={tab.activeIcon}
                                inactiveIcon={tab.inactiveIcon}
                                size={tab.size}
                            />
                        ),
                    }}
                >
                    {() => {
                        const Component = tab.component;   // 👈 Capitalize
                        return <Component data={tab.dataset} />;
                    }}
                </Tab.Screen>
            ))}

        </Tab.Navigator>
    );
};

export default ProfileTabs;
