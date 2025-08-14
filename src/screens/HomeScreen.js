import {
  View,
  SafeAreaView,
  Animated,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, { useRef } from 'react';
import Feeds from '../components/Feeds';
import Header from '../components/Header';
import user from '../data/userData';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import userStories from '../data/storiesData';
import usersPosts from '../data/postsData';
import Stories from '../components/StoryPage/Stories';

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabBarHeight = useBottomTabBarHeight();

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  // Your profile (always shown)
  const myStory = {
    id: user.id,
    userName: 'Your Story',
    profileImage: user.profileImage,
    hasStory: user.hasStory, // change to true if you want the ring to appear
  };

  // Final stories array: your story + others (only if hasStory)
  const stories = [myStory, ...userStories.filter((story) => story.hasStory)];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
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
              data={stories}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <Stories story={item} />}
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
