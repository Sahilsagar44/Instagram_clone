import {
  View,
  SafeAreaView,
  Animated,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, { useRef, useMemo } from 'react';
import Feeds from '../components/Feeds';
import Header from '../components/Header';
import user from '../data/userData';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import usersPosts from '../data/postsData';
import { OtherUsersData } from './../data/otherUsersData';
import colors from '../constants/colors';
import Stories from './../components/Stories';

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabBarHeight = useBottomTabBarHeight();

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const myStory = {
    id: `my_${user.id}`,
    userName: 'Your Story',
    profileImage: user.profileImage,
    hasStory: user.hasStory,
    isMe: true,
  };

  const otherStories = useMemo(() => {
    return OtherUsersData.flatMap(user =>
      user.stories
        .filter(story => !story.isExpired)
        .map(story => ({
          ...story,
          username: user.username,
          profileImage: user.profileImage,
          isMe: false,
          hasStory: true,
        }))
    );
  }, []);

  
  const allStories = [myStory, ...otherStories];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgColor} />


      <Animated.View style={[styles.  header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Header />
      </Animated.View>

      <Animated.FlatList
        data={usersPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Feeds post={item} />}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: tabBarHeight + 20,
        }}
        ListHeaderComponent={
          <View style={styles.storiesWrapper}>
            <FlatList
              data={allStories}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Stories
                  story={item}
                  allStories={allStories}
                  tapIndex={index}
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white',
  },
  storiesWrapper: {
    paddingVertical: 8,
  },
});
