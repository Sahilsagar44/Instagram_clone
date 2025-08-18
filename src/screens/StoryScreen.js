import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import user from '../data/userData';
import colors from '../constants/colors';
import { OtherUsersData } from '../data/otherUsersData';

const StoryScreen = ({ route, navigation }) => {
  const { stories: routeStories, startIndex = 0 } = route.params || {};

  // Combine your story with other users stories
  const allStories = routeStories || [
    {
      id: user.id,
      image: user.storyImage || user.profileImage, 
      title: 'Your Story',
      time: user.storyTime || '2h ago',
      musicName: user.storyMusic || '',
      profileImage: user.profileImage,
    },
    ...OtherUsersData.flatMap(userObj =>
      userObj.stories
        .filter(story => !story.isExpired)
        .map(story => ({
          ...story,
          profileImage: userObj.profileImage,
          image: story.image,
        }))
    ),
  ];

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const story = allStories[currentIndex];

  const handleNext = () => {
    if (currentIndex < allStories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.goBack(); 
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigation.goBack(); 
    }
  };

  return (
    <View style={styles.container}>
      {/* left right story */}
      <View style={styles.touchContainer}>
        <TouchableOpacity style={styles.leftZone} onPress={handlePrev} />
        <TouchableOpacity style={styles.rightZone} onPress={handleNext} />
      </View>

      {/* story image */}
      {story.image ? (
        <Image source={{ uri: story.image }} style={styles.storyImage} />
      ) : (
        <View style={[styles.storyImage, styles.placeholder]}>
          <Text style={{ color: colors.mainStorycolor }}>No Image</Text>
        </View>
      )}

      {/* story header */}
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image source={{ uri: story.profileImage }} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.headerName}>{story.title}</Text>
              {story.time && <Text style={styles.timeStamp}>  •  {story.time}</Text>}
            </View>
            {story.musicName ? (
              <Text style={styles.music}>{story.musicName}</Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* putter */}
      <View style={styles.putter}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: colors.subFontColor, color: colors.fontColor,borderRadius:20 }}
          placeholder="message..."
          placeholderTextColor={colors.subFontColor}
        />
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Feather name="send" size={26} color={colors.postIconColor} />
          <Text style={styles.iconsHeading}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/dots.png')}
            style={styles.icons}
          />
          <Text style={styles.iconsHeading}>Activity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryScreen;

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
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.msgColor,
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
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 15,
  },
  icons: {
    width: 26,
    height: 26,
  },
  iconsHeading: {
    fontSize: 12,
    color: colors.fontColor,
  },
  touchContainer: {
    position: 'absolute',
    width: '100%',
    height: '85%',
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
