import React from 'react';
import { Image } from 'react-native';

const ProfileTabIcon = ({ focused, activeIcon, inactiveIcon, size = 24 }) => {
  return (
    <Image
      source={focused ? activeIcon : inactiveIcon}
      style={{
        width: size,
        height: size,
        resizeMode: 'contain',
      }}
    />
  );
};

export default ProfileTabIcon;