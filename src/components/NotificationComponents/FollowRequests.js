import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { notificationsData } from '../../data/NotificationData';

const FollowRequests = () => {
  // Filter follow requests from data
  const followRequests = notificationsData.filter(
    (item) => item.type === 'follow_request'
  );

  // Grab first and second profile images if available for overlapping images
  const firstImage = followRequests[0]?.profileImage;
  const secondImage = followRequests[1]?.profileImage;

const isSingleRequest = followRequests.length === 1;


  return (
    <View style={styles.followRequests}>
      <View style={styles.followImagesContainer}>
        {firstImage && (
          <Image source={{ uri: firstImage }} style={isSingleRequest ?styles.singleFollowImage :styles.followImage1} />
        )}
        {followRequests.length > 1 && secondImage && (
          <Image
            source={{ uri: secondImage }}
            style={styles.overlapFollowImage}
          />
        )}
      </View>

      <View style={styles.txtContainer}>
        <Text style={styles.followers}>Follow requests</Text>
        <Text style={styles.subTxt}>
          {followRequests.length} {followRequests.length === 1 ? 'person' : 'people'} requested to follow you
        </Text>
      </View>

      <MaterialIcons
        name="arrow-forward-ios"
        size={20}
        color={colors.iconColor}
      />
    </View>
  );
};

export default FollowRequests;

const styles = StyleSheet.create({
  followRequests: {
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  followImagesContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginRight: 4,
  },
  followImage1: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  overlapFollowImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderColor,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  singleFollowImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  txtContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 40,
  },
  followers: {
    fontSize: 15,
    color: colors.fontColor,
    fontWeight: 'bold',
  },
  subTxt: {
    fontSize: 13,
    color: colors.subFontColor,
  },
});
