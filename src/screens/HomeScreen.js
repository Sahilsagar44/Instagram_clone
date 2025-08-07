import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, Animated } from 'react-native'
import React, { use, useRef } from 'react'
import Feeds from '../components/Feeds'
import colors from '../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Stories from '../components/Stories';
import userData from '../data/userData';
import Header from '../components/Header';




const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const posts = userData.posts;
  const stories = userData.stories;

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -100], // Move header up by 100px
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerContainer,{ transform: [{ translateY: headerTranslateY }] }]}>
        <Header />
      </Animated.View>
      {/* <Stories /> */}
      <Animated.FlatList
        data={posts}
        renderItem={({ item }) => <Feeds post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={<View style={styles.storiesContainer}></View>}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}

      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },

  storiesContainer: {
    paddingBottom: 10,
  },
  headerContainer:{
      position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.bgColor
  }
}) 