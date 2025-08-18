import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Stories = ({ story, allStories, tapIndex }) => {
  const navigation = useNavigation();

  if (!story) return null;

  const isMe = story.isMe;

  const StoryImage = (
    <Image
      source={{ uri: story.profileImage }}
      style={styles.storyImage}
    />
  );

  const onStoryPress = () => {
    // Prevent navigation if this is your story but no story exists
    if (isMe && !story.hasStory) {
      // Optionally show message or just return
      return;
    }

    navigation.navigate('StoryScreen', {
      stories: allStories,
      startIndex: tapIndex,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onStoryPress} activeOpacity={0.7}>
        <View style={story.hasStory ? styles.storyRing : styles.noStoryRing}>
          {StoryImage}

          {isMe && !story.hasStory && (
            <View style={styles.addIconContainer}>
              <Image
                source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/plus.png')}
                style={styles.addIcon}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>

      <Text style={styles.usernameText} numberOfLines={1}>
        {isMe ? 'Your Story' : story.userName}
      </Text>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  storyRing: {
    borderWidth: 2,
    borderColor: '#ff8501',
    borderRadius: 40,
    padding: 2,
  },
  noStoryRing: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 40,
    padding: 2,
  },
  storyImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  usernameText: {
    fontSize: 12,
    maxWidth: 80,
    textAlign: 'center',
    color: colors.fontColor,
    marginTop: 4,
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    padding: 1,
    borderWidth: 2,
    borderColor: colors.backgroundColor,
  },
  addIcon: {
    height: 16,
    width: 16,
  },
});
