import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';

const userProfilePosts = ({data}) => {
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

   if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Posts Available</Text>
      </View>
    );
  }
  return (
    <View style={styles.fullContainer}>
      <FlatList
        data={data}
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

export default userProfilePosts;

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
   emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
  },
  emptyText: {
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: '500',
  },
});
