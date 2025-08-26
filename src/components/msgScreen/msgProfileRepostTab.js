import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messageData from './../../data/messageData';
import colors from '../../constants/colors';

const reposts = messageData.reposts || []; 

const MsgProfileRepostTab = () => {
  if (reposts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="repeat-outline" size={60} color="grey" />
        <Text style={styles.noRepostsText}>No Reposts found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messageData.reposts}
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.repostImage} />
      )}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MsgProfileRepostTab;

const styles = StyleSheet.create({
  grid: {
    paddingBottom: 80,
  },
  repostImage: {
    width: '33%',
    aspectRatio: 1, 
    margin: 0.5,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRepostsText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
  },
});
