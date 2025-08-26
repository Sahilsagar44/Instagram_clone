import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../constants/colors'
import messageData from '../../data/messageData'
import msgProfileIconsData, { msgProfileBtnIconsData } from './../../data/IconsData'
import { Tabs } from 'react-native-collapsible-tab-view'
import { myProfileTabs, userMsgProfileTabs } from '../../navigation/profileTabsConfig'

const MsgProfile = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { chatId } = route.params
  const profile = messageData.find(p => p.id === chatId)
  const isMe = route?.params?.isMe ?? true;
  const tabsConfig = isMe ? userMsgProfileTabs : myProfileTabs;

  return (
    <Tabs.Container
      renderHeader={() => (
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color={colors.postIconColor} />
          </TouchableOpacity>

          <View style={styles.profileData}>
            <Image source={{ uri: profile.user.profileImage }} style={styles.profileImage} />
            <Text style={styles.username}>{profile.user.name}</Text>
          </View>

          <View style={styles.iconRow}>
            {msgProfileIconsData.map((icon, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.iconWrapper} 
                onPress={() => console.log(icon.iconName)}
              >
                {icon.iconSet === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons name={icon.name} size={icon.size} color={icon.color} />
                ) : (
                  <Ionicons name={icon.name} size={icon.size} color={icon.color} />
                )}
                <Text style={styles.iconLabel}>{icon.iconName}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.optionsList}>
            {msgProfileBtnIconsData.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.optionItem}
                onPress={() => console.log(item.iconName)}
              >
                {item.iconSet === "image" ? (
                  <Image source={item.source} style={[styles.optionIcon, { tintColor: item.color }]} />
                ) : (
                  <Ionicons name={item.name} size={item.size} color={item.color} />
                )}
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>{item.iconName}</Text>
                  {item.subTxt && <Text style={styles.subtxt}>{item.subTxt}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    >
      {tabsConfig.map((tab, index) => (
        <Tabs.Tab name={tab.name} key={index}>
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <tab.component /> 
          </Tabs.ScrollView>
        </Tabs.Tab>
      ))}
    </Tabs.Container>
  )
}

export default MsgProfile

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  headerContent: {
    backgroundColor: colors.bgColor,
  },
  profileData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  username: {
    color: colors.fontColor,
    fontSize: 22,
    fontWeight: '600',
  },
  iconRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  iconWrapper: {
    alignItems: 'center',
    gap: 6,
  },
  iconLabel: {
    color: colors.fontColor,
    fontSize: 13,
  },
  optionsList: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  optionTextWrapper: {
    marginLeft: 12,
  },
  optionTitle: {
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: '500',
  },
  subtxt: {
    color: colors.subFontColor,
    fontSize: 13,
    marginTop: 2,
  },
})
