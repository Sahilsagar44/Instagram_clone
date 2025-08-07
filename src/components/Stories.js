import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Stories = ({ story }) => {
  if (!story) return null;

  const isMe = story.isMe;

  const StoryImage = (
    <Image
      source={{ uri: story.profileImage }}
      style={styles.storyImage}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },
  addIcon: {
    height: 16,
    width: 16,
    backgroundColor:'red'
  },

});
