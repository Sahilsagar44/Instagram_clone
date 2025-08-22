import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import QRCode from 'react-native-qrcode-svg';
import user from '../../data/userData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ShareProfilePage = () => {
  return (
    <LinearGradient
      colors={[colors.LinearColor.start, 'orange', 'red']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.qrContainer}>
        <QRCode
          value="https://instaclone.app/user/sahil_dev"
          size={200}
          enableLinearGradient={true}
          linearGradient={[colors.LinearColor.start, 'orange', 'red']}
        />
        <Text style={styles.username}>@{user.username}</Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={{ flexDirection: 'column',alignItems:'center'}}>
          <TouchableOpacity style={[styles.IconsBackGround,]}>
            <Ionicons name='share-social-outline' size={25} color={colors.iconColor} />
          </TouchableOpacity>
          <Text style={styles.iconNames}>Share</Text>
        </View>
        <View style={{ flexDirection: 'column',alignItems:'center' }}>
          <TouchableOpacity style={[styles.IconsBackGround]}>
            <Fontisto name='link' size={25} color={colors.iconColor} />
          </TouchableOpacity>
          <Text style={styles.iconNames}>Copy-Link</Text>
        </View>
        <View style={{ flexDirection: 'column',alignItems:'center' }}>
          <TouchableOpacity style={[styles.IconsBackGround]}>
            <AntDesign name='download' size={25} color={colors.iconColor} />
          </TouchableOpacity>
          <Text style={styles.iconNames}>Download</Text>
        </View>
      </View>
    </LinearGradient>
  )
}

export default ShareProfilePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25
  },
  qrContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '14%',
    paddingHorizontal: '10%',
    borderRadius: 20,
    elevation: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  username: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  btnContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: '10%',
    paddingHorizontal: '10%',
    borderRadius: 20,
    elevation: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    gap:20,
  },
  IconsBackGround: {
    borderRadius: 35,
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  iconNames: {
    fontSize: 15,
  },
})
