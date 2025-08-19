import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import user from '../../data/userData';
import colors from '../../constants/colors';

const ProfilePosts = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <Image
          source={{ uri: item.image || item.postImage }}
          style={styles.postImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.fullContainer}>
      <FlatList
        data={user.posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridSpacing}
      />
    </View>
  );
};

export default ProfilePosts;

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
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
