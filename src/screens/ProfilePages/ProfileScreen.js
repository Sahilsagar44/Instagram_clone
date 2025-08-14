import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../../components/ProfileComponents/ProfileHeader'
import ProfileTabs from '../../navigation/ProfileTabs';
import MiddleContent from '../../components/ProfileComponents/MiddleContent';
import colors from '../../constants/colors';


const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <MiddleContent/>
      <ProfileTabs />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.bgColor,
  },

})