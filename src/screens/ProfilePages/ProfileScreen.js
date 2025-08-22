import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../../components/ProfileComponents/ProfileHeader'
import ProfileTabs from '../../navigation/ProfileTabs';
import MiddleContent from '../../components/ProfileComponents/MiddleContent';
import colors from '../../constants/colors';
import { myProfileTabs,userProfileTabs } from './../../navigation/profileTabsConfig';

const ProfileScreen = ({route}) => {
  const isMe = route?.params?.isMe ?? true; // pass this when navigating
  const tabsConfig = isMe ? myProfileTabs : userProfileTabs;
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <MiddleContent/>
      <ProfileTabs tabsConfig={tabsConfig}/>
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