import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messageData from './../../data/messageData';
import colors from '../../constants/colors';

const links = messageData.links || [];
const MsgProfileLinksTab = () => {
  if (links.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="link-outline" size={60} color="grey" />
        <Text style={styles.noLinksText}>No Links found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messageData.links}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => Linking.openURL(item.url)}
        >
          <Ionicons name="link-outline" size={22} color="#1DA1F2" />
          <Text style={styles.linkText}>{item.title || item.url}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MsgProfileLinksTab;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  linkText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#1DA1F2',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLinksText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
  },
});
