import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import QRCode from 'react-native-qrcode-svg';


const shareProfilePage = () => {
  return (
    <LinearGradient
      colors={[colors.LinearColor.start, 'orange', 'red']}   // 👈 gradient colors
      style={styles.container}
      start={{ x: 0, y: 0 }}   // gradient direction
      end={{ x: 1, y: 1 }}>
    <View>
      {/* <QRCode
          // value="https://instaclone.app/user/sahil_123" // your profile link or username
          size={200} // size of the QR code
          color="black"
          backgroundColor="white"
        /> */}


      <Text>shareProfilePage</Text>
    </View>
    </LinearGradient>
  )
}

export default shareProfilePage

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})