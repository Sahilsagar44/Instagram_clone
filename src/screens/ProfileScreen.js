import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../components/ProfileComponents/ProfileHeader'
import ProfileTabs from '../navigation/ProfileTabs';
import MiddleContent from './../components/ProfileComponents/MiddleContent';
import colors from '../constants/colors';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[2]}>
      <ProfileHeader />
      <MiddleContent/>
      <View style={styles.tabsContainer}>
        <ProfileTabs />
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tabsContainer: {
    height: 600,  // or some fixed height for the tabs content to show properly
  },
})