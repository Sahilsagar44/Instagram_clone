import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import usersPosts from '../../data/postsData';
import colors from '../../constants/colors';
import SearchBox from '../SearchBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SendPage = () => {
  // const post = usersPosts.find(p => p.id === postId) || usersPosts[0];
  const [select, setSelect] = useState([])

  const users = usersPosts.map(post => post.user)

  const handleProfileTap = (index) => {
    setSelect(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)  
        : [...prev, index])
  }

  const renderItems = useCallback(({ item, index }) => {

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleProfileTap(index)} style={{ alignItems: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: item.profileImage }} style={styles.itemProfileImage} />
            {
              select.includes(index) && (
                <View style={styles.checkImage} >
                  <FontAwesome name='check-circle' size={20} color={colors.smsBackground} />
                </View>

              )
            }
          </View>
          <Text style={styles.userName}>{item.displayName}</Text>

        </TouchableOpacity>

      </View>
    )
  }, [select])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBox style={styles.searchBox} />
        <TouchableOpacity>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/group.png')}
            style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      
      
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderItems({ item, index })}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ScrollView style={styles.putter} horizontal showsHorizontalScrollIndicator={false}>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.whatsappBackground }]}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/status.png')}
            style={styles.statusIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.borderTopColor }]}>
          <Ionicons name='share-social-outline' size={25} color={colors.postIconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.whatsappBackground }]}>
          <Ionicons name='logo-whatsapp' size={30} color={colors.postIconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.borderTopColor }]}>
          <Fontisto name='link' size={25} color={colors.postIconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.snapchatBackground }]}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/snapchat.png')}
            style={styles.statusIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.smsBackground }]}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/sms.png')}
            style={styles.statusIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.facebookBackground }]}>
          <Ionicons name='logo-facebook' size={30} color={colors.postIconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.bgColor }]}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/threads.png')}
            style={styles.statusIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.IconsBackGround, { backgroundColor: colors.borderTopColor }]}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/addStory.png')}
            style={styles.statusIcon} />
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default SendPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.commentsbgColor,
  },
  listContent: {
    paddingVertical: 10,
  },
  itemContainer: {
    width: '33.33%',
    alignItems: 'center',
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 50,
    paddingVertical: 10,
  },
  searchBox: {
    marginRight: 10,
    flex: 1,
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },
  itemProfileImage: {
    width: 78,
    height: 78,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.fontColor,
    elevation: 2,
    shadowColor: colors.bgColor,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  checkImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.commentsbgColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.commentsbgColor,
  },
  userName: {
    fontSize: 12,
    color: colors.fontColor,
    textAlign: 'center',
    marginTop: 2,
  },
  putter: {
    paddingVertical: 14,
    // paddingLeft: 20,
    // paddingRight: 40,
    paddingHorizontal:10,
    borderTopWidth: 0.5,
    paddingBottom:'20%',
    borderColor: colors.borderColor,
  },
  IconsBackGround: {
    borderRadius: 35,
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statusIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
