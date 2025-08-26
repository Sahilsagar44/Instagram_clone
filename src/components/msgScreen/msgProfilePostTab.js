import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messageData from '../../data/messageData';
import colors from '../../constants/colors';

const posts = messageData.posts || [];

const MsgProfilePostTab = () => {
  if (posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="grid-outline" size={60} color="grey" />
        <Text style={styles.noPostsText}>No Content</Text>
      </View>
    );
  }

  return (
      <FlatList
        data={messageData.posts}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.postImage} />
        )}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    
  );
};

export default MsgProfilePostTab;

const styles = StyleSheet.create({
  
  grid: {
    paddingBottom: 80,
  },
  postImage: {
    width: '33%',
    aspectRatio: 1,
    margin: 0.5,
  },
  emptyContainer: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostsText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
  },
});