import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import user from '../../data/userData';
import colors from '../../constants/colors';

const ProfileReels = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.postImage}
        />
        <View style={styles.viewsContainer}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/views.png')} style={{ width: 15, height: 15 }} />
          <Text style={styles.viewsText}>
            {item.viewsCount || 0}
          </Text>
        </View>
        <View style={styles.reelsLogoContainer}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/reel(1).png')} style={styles.reelsLogo} />
        </View>

      </View>
    );
  };

  return (
    <View style={styles.fullContainer}>
      <FlatList
        data={user.Reels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={styles.gridSpacing}
      />
    </View>
  );
};

export default ProfileReels;

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
  viewsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 8,
    left: 8,
    gap: 5
  },
  viewsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    borderColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center'
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
});
