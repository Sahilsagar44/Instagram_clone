import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../../constants/colors';
import usersPosts from '../../data/postsData';
import ProfileTabs from '../../navigation/ProfileTabs';
import { myProfileTabs, userProfileTabs } from '../../navigation/profileTabsConfig';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Now route is defined before usage
  const isMe = route?.params?.isMe ?? true;
  const tabsConfig = isMe ? userProfileTabs : myProfileTabs;

  const { userId } = route.params || {};

  const profileUser = useMemo(() => {
    if (!userId) return null;
    const post = usersPosts.find(p => p.userId === userId);
    if (!post) return null;

    return {
      ...post.user,
      followedBy: post.followedBy || [],
    };
  }, [userId]);

  

  if (!profileUser) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.fontColor} />
        <Text style={styles.loaderText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color={colors.postIconColor} />
          </TouchableOpacity>
          <Text style={styles.username}>{profileUser.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={28}
            color={colors.postIconColor}
          />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color={colors.postIconColor}
          />
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileRow}>
          {/* Profile Image */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: profileUser.profileImage }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.avatarPlusBtn}>
              <MaterialIcons name="add-circle" size={26} color={colors.fontColor} />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <StatItem count={profileUser.postsCount} label="Posts" />
            <StatItem count={profileUser.followers} label="Followers" />
            <StatItem count={profileUser.following} label="Following" />
          </View>
        </View>

        <Text style={styles.displayName}>{profileUser.displayName}</Text>
        {profileUser.bio ? <Text style={styles.bio}>{profileUser.bio}</Text> : null}

        {profileUser.threadUsername ? (
          <View style={styles.threadRow}>
            <Image
              source={require('../../assets/icons/threads.png')}
              style={styles.threadIcon}
            />
            <Text style={styles.threadUsername}>{profileUser.threadUsername}</Text>
          </View>
        ) : null}
      </View>

      {/* Followed By Section */}
      <FollowedBySection followedBy={profileUser.followedBy} />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <ActionButton
          label={!profileUser.isFollowYou ? 'Follow' : 'Following'}
          icon={
            profileUser.isFollowYou ? (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={14}
                color={colors.postIconColor}
              />
            ) : null
          }
        />
        <ActionButton label="Share Profile" />
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
          <Image
            source={require('../../assets/icons/invite.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Tabs moved here (bottom like Instagram) */}
      <ProfileTabs tabsConfig={tabsConfig} />
    </View>
  );
};

export default UserProfileScreen;

const StatItem = ({ count, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statNumber}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionButton = ({ label, icon }) => (
  <TouchableOpacity style={styles.primaryButton} activeOpacity={0.7}>
    <Text style={styles.buttonText}>
      {label} {icon}
    </Text>
  </TouchableOpacity>
);

const FollowedBySection = ({ followedBy }) => {
  if (!followedBy || followedBy.length === 0) return null;

  const displayUsers = followedBy.slice(0, 3); // show only first 3 images
  const extraCount = followedBy.length - displayUsers.length;

  return (
    <View style={styles.followedByContainer}>
      <View style={styles.imagesRow}>
        {displayUsers.map((f, index) => (
          <Image
            key={f.id}
            source={{ uri: f.profileImage }}
            style={[
              styles.followerImage,
              { marginLeft: index === 0 ? 0 : -12, zIndex: 3 - index },
            ]}
          />
        ))}
      </View>

      {/* Text */}
      <Text style={styles.followedByText}>
        Followed by{' '}
        {displayUsers.map((f, i) => (
          <Text key={f.id} style={styles.boldText}>
            {f.name}
            {i < displayUsers.length - 1 ? ', ' : ''}
          </Text>
        ))}
        {extraCount > 0 && (
          <Text style={styles.boldText}> +{extraCount} more</Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
  },
  loaderText: { marginTop: 10, color: colors.fontColor, fontSize: 14 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  username: { color: colors.fontColor, fontSize: 18, fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  profileSection: { marginHorizontal: 16, marginTop: 10 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatarWrapper: { position: 'relative', marginRight: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  avatarPlusBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.bgColor,
    borderRadius: 20,
  },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { color: colors.fontColor, fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: colors.fontColor, fontSize: 14 },
  displayName: { color: colors.fontColor, fontSize: 16, fontWeight: '500' },
  bio: { color: colors.fontColor, fontSize: 14, marginTop: 4 },
  threadRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  threadIcon: { width: 14, height: 14, marginRight: 6 },
  threadUsername: { color: colors.fontColor, fontSize: 14, fontWeight: '500' },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
    marginHorizontal: 10,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.ProfileBtns,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: colors.fontColor, fontWeight: '600' },
  iconButton: {
    padding: 10,
    backgroundColor: colors.ProfileBtns,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: { height: 20, width: 20, resizeMode: 'contain' },
  followedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  imagesRow: { flexDirection: 'row', marginRight: 10 },
  followerImage: {
    width: 30,
    height: 30,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.bgColor,
  },
  followedByText: { color: colors.fontColor, fontSize: 13 },
  boldText: { fontWeight: '600', color: colors.fontColor },
});
