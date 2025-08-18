import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import colors from './../constants/colors';
import user from './../data/userData';
import messageData from './../data/messageData';

const MessageScreen = () => {
  const navigation = useNavigation()

  const renderMsgItems = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("msgScreen", { chatId: item.id })}
      >
        <Image source={{ uri: item.user.profileImage }} style={styles.profileImages} />
        <View style={styles.nameMsg}>
          <Text style={styles.usernameTxt}>{item.user.name}</Text>
          <Text
            style={item.unreadCount > 0 ? styles.msgText : styles.readMsgText}
            numberOfLines={1}
          >
            {
              item.unreadCount >= 4 && item.unreadCount !== 0
                ? item.unreadCount + '+ new messages'
                : item.unreadCount === 0
                  ? item.lastMessage
                  : item.unreadCount + ' new messages'
            }
          </Text>
        </View>
        <TouchableOpacity style={styles.cameraIconBtn}>
          <Ionicons name='camera-outline' size={24} color={colors.postIconColor} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colors.postIconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCenter}>
          <Text style={styles.headertxt}>{user.username}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.iconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/NewMessage.png')}
            style={styles.newMessage}
          />
        </TouchableOpacity>
      </View>

      {/* Message List */}
      <FlatList
        data={messageData}
        keyExtractor={(item) => item.id}
        renderItem={renderMsgItems}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        removeClippedSubviews
        ListHeaderComponent={
          <View style={styles.headerMsg}>
            <TouchableOpacity style={styles.messagesBtn}>
              <Text style={styles.messagesTxt}>Messages</Text>
              <Ionicons
                name='notifications-off-outline'
                size={15}
                color={colors.postIconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.requestsTxt}>Requests</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    paddingHorizontal: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgColor,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTopColor || '#222',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertxt: {
    color: colors.fontColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  newMessage: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  headerMsg: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgColor,
  },
  messagesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagesTxt: {
    color: colors.fontColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 3,
  },
  requestsTxt: {
    fontSize: 16,
    color: colors.changeProfileTxt,
    fontWeight: '600',
  },
  flatListContent: {
    paddingBottom: 60,
    backgroundColor: colors.bgColor,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTopColor || '#222',
    backgroundColor: colors.bgColor,
  },
  profileImages: {
    height: 54,
    width: 54,
    borderRadius: 27,
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: colors.borderTopColor || '#222',
  },
  nameMsg: {
    flex: 1,
    justifyContent: 'center',
  },
  usernameTxt: {
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  msgText: {
    color: colors.fontColor,
    fontSize: 14,
    fontWeight: '500',
  },
  readMsgText: {
    color: colors.subFontColor,
    fontSize: 14,
    fontWeight: '400',
  },
  cameraIconBtn: {
    padding: 6,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
