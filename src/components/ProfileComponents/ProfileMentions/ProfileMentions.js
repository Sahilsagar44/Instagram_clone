import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import user from '../../../data/userData';
import colors from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const ProfileMentions = () => {
  const navigation = useNavigation()
  const handlePress = (index) => {
    navigation.navigate('MentionDetails', { mentions: user.mentions, startIndex: index });
  }

  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        style={styles.postContainer}
        activeOpacity={0.8}
       onPress={() => handlePress(index)}

      >
        <Image
          source={{ uri: item.type === 'reel' ? item.thumbnail : item.uri }}
          style={styles.postImage}
        />

        {item.type === 'post' && item.isMultipleImages && (
          <View style={styles.reelsLogoContainer}>
            <Image
              source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/multiplePost.png')}
              style={styles.multipleImages}
            />
          </View>
        )}

        {item.type === 'reel' && (
          <View style={styles.reelsLogoContainer}>
            <Image
              source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel(1).png')}
              style={styles.reelsLogo}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.fullContainer}>
      <FlatList
        data={user.mentions}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItem}
        numColumns={3}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridSpacing}
      />
    </View>
  );
};

export default ProfileMentions;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  gridSpacing: {
    paddingBottom: 80,
    backgroundColor: colors.bgColor,
  },
  postContainer: {
    flex: 1 / 3,
    height: 180,
    margin: 1,
    backgroundColor: colors.bgColor,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reelsLogoContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 22,
    height: 22,
  },
  reelsLogo: {
    width: '100%',
    height: '100%',
  },
  multipleImages: {
    width: '75%',
    height: '75%',
  }
});
