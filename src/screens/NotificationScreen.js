import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View, SectionList } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import FollowRequests from '../components/NotificationComponents/FollowRequests';
import { notificationsData } from '../data/NotificationData';


const sectionsOrder = [
  { key: 'today', title: 'Today' },
  { key: 'yesterday', title: 'Yesterday' },
  { key: 'last_7_days', title: 'Last 7 Days' },
  { key: 'last_30_days', title: 'Last 30 Days' },
  { key: 'suggestions', title: 'Suggestions For You' },
];

const groupedNotifications = sectionsOrder.map(section => ({
  title: section.title,
  data: notificationsData.filter(item => item.section === section.key),
}))

const NotificationScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  const renderNotificationItem = ({ item }) => {

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />

        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.username}{' '}
            <Text style={styles.message}>{item.message}</Text></Text>
          {item.time ? <Text style={styles.time}>{item.time}</Text> : null}
        </View>
        {item.postImage && (
          <Image
            source={{ uri: item.postImage }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
      </View>
    )
  }
  const renderSectionHeader = ({ section }) => {
    if (section.data.length === 0) return null;
    return (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <Ionicons name='arrow-back' size={30} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      
      <SectionList
        sections={groupedNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={<FollowRequests/>}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      />


    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 15,
  },
  header: {
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.fontColor,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  postImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    fontWeight: 'normal',
    color: 'white',
  },
  time: {
    fontSize: 12,
    color: colors.time,
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 15,
    fontWeight: 'bold',
    color: colors.fontColor,
    fontSize: 16,
  },
});