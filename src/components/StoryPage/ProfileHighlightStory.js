import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import user from './../../data/userData';
import colors from './../../constants/colors';
import  Feather  from 'react-native-vector-icons/Feather';

const ProfileHighlightStory = ({ route }) => {
  const { startIndex = 0 } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const highlights = user.highlights;
  const story = highlights[currentIndex];

  const handleNext = () => {
    if (currentIndex < highlights.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Touchable zones for left/right */}
      <View style={styles.touchContainer}>
        <TouchableOpacity style={styles.leftZone} onPress={handlePrev} />
        <TouchableOpacity style={styles.rightZone} onPress={handleNext} />
      </View>

      <Image source={{ uri: story.image }} style={styles.storyImage} />
      
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>

          <Image source={{ uri: story.image }} style={styles.profileImage} />

          <View style={styles.textContainer}>

            <View style={styles.nameRow}>
              <Text style={styles.headerName}>{story.title}</Text>
              <Text style={styles.timeStamp}>  •  {story.time}</Text>
            </View>

            <Text style={styles.music}>{story.musicName}</Text>
          </View>
        </View>
      </View>
      {/* Putter */}
      <View style={styles.putter}>

        <TouchableOpacity style={{ alignItems: 'center', marginRight: 50 }}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/friends.png')} style={styles.icons} />
          <Text style={styles.iconsHeading}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/Browse.png')} style={styles.icons} />
          <Text style={styles.iconsHeading}>Browse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel.png')} style={styles.icons} />
          <Text style={styles.iconsHeading}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/facebook.png')} style={styles.icons} />
          <Text style={styles.iconsHeading}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Feather name='send' size={26} color={colors.postIconColor} />        
          <Text style={styles.iconsHeading}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/dots.png')} style={styles.icons} />
          <Text style={styles.iconsHeading}>Activity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHighlightStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  storyImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '90%',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerName: {
    fontSize: 15,
    color: colors.fontColor,
    fontWeight: 'bold',
  },
  timeStamp: {
    fontSize: 13,
    color: colors.subFontColor,
  },
  music: {
    fontSize: 13,
    color: colors.fontColor,
  },
  putter: {
    top: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 15
  },
  icons: {
    width: 26,
    height: 26,
  },
  iconsHeading: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.fontColor
  },
  touchContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    zIndex: 10,
  },
  leftZone: {
    flex: 1,
  },
  rightZone: {
    flex: 1,
  },
});
