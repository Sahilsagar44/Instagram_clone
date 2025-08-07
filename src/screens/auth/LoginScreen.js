import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from './../../constants/colors';
import InputBox from '../../components/InputBox';
import PasswordInputBox from '../../components/passworInputBox';
import CustomTouchable from './../../components/CustomTouchable';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  }
  const handleSignUp = () => {
    navigation.navigate('RegisterScreen');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('D:/sahil/react_native/Instagram_clone/src/assets/images/Instagram.png')} />
      <InputBox
        placeholder='Phone number, username or email'
        onChangeText={() => { }}
      />

      <PasswordInputBox
        placeholder='Password'
        secureTextEntry={true}
      />
      <View style={styles.forgotPassword}>
        <CustomTouchable text="forgot Password?" style={{ color: colors.TouchableButtonColor }} onPress={() => { }} />
      </View>

      <View >
        <CustomTouchable
          text="Log In"
          onPress={() => { handleLogin() }}
          style={styles.button}
          textStyle={{ color: colors.fontColor }}
        />
      </View>

      
      <View style={styles.register}>
        <CustomTouchable text="Don't have an account? Sign Up" style={{ color: colors.TouchableButtonColor}} onPress={() => {handleSignUp()}} />
      </View>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    
  },
  logo: {
    width: '60%',
    height: '10%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  forgotPassword: {
    width: '85%',
    marginTop: 15,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: colors.ButtonColor,
    paddingVertical: 16,
    paddingHorizontal: '36%',
    borderRadius: 5,
    color: colors.fontColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  register: {
    marginTop: 50,
    
}
});