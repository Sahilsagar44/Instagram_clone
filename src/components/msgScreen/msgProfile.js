import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../constants/colors'
import messageData from '../../data/messageData'
import msgProfileIconsData, { msgProfileBtnIconsData } from './../../data/IconsData'
import ProfileTabs from '../../navigation/ProfileTabs'
import { myProfileTabs, userMsgProfileTabs } from '../../navigation/profileTabsConfig'
import Octicons from 'react-native-vector-icons/Octicons';

const MsgProfile = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [activeModal, setActiveModal] = useState(null);
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });


  const navigation = useNavigation()
  const route = useRoute()
  const { chatId } = route.params
  const profile = messageData.find(p => p.id === chatId)

  const isMe = route?.params?.isMe ?? false;
  const tabsConfig = isMe ? myProfileTabs : userMsgProfileTabs;

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Profile not found</Text>
      </View>
    );
  }
  const handleAction = (item, event) => {
    if (item.actionType === 'modal') {
      const { pageX, pageY } = event.nativeEvent;
      setTapPosition({ x: pageX, y: pageY });
      setActiveModal(item.iconName);
      setModalVisible(true);
    } else if (item.actionType === 'navigate' && item.navigateTo) {
      navigation.navigate(item.navigateTo);
    } else {
      console.log(item.iconName, 'clicked but no action');
    }
  };

  return (
    <View style={styles.container}>

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
            onPress={(e) => handleAction(icon, e)}
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
            style={[styles.optionItem]}
            onPress={(e) => handleAction(item, e)}
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

      <View style={styles.tabsWrapper}>
        <ProfileTabs tabsConfig={tabsConfig} />
      </View>

      <Modal visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >

        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContainer,
              { top: tapPosition.y + 25, left: tapPosition.x - 100 }
            ]}
          >
            <View style={styles.modalColumn}>
              <MaterialCommunityIcons name='account-off' color={colors.fontColor} size={25} />
              <Text style={{ color: colors.fontColor, marginLeft: 8, fontSize: 18 }}>Restrict</Text>
            </View>
            <View style={styles.modalColumn}>
              <MaterialCommunityIcons name='block-helper' color={colors.reportBtn} size={24} />
              <Text style={{ color: colors.reportBtn, marginLeft: 8, fontSize: 18 }}>Block</Text>
            </View>
            <View style={styles.modalColumn}>
              <Octicons name='report' color={colors.reportBtn} size={24} />
              <Text style={{ color: colors.reportBtn, marginLeft: 8, fontSize: 18 }}>Report</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default MsgProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
  profileData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 11,
    gap: 10,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  username: {
    color: colors.fontColor,
    fontSize: 20,
    fontWeight: '600',
  },
  iconRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
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
    marginTop: 10,
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
  tabsWrapper: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'grey',
    width: '40%',
    padding: 20,
    borderRadius: 10,
  },
  modalColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
})