import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React from 'react'
import InputBox from '../../components/InputBox'
import PasswordInputBox from '../../components/passworInputBox'
import CustomTouchable from '../../components/CustomTouchable'
import colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('LoginScreen');
    Alert.alert("Registration Successful", "You have successfully registered!");
  }

  const handleLogIn = () => {
    navigation.navigate('LoginScreen')
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

         <PasswordInputBox
           placeholder='Confirm Password'
           secureTextEntry={true}
         />
   
         <View >
           <CustomTouchable
             text="Register"
             onPress={() => { handleRegister() }}
             style={styles.button}
             textStyle={{ color: colors.fontColor }}
           />
         </View>
   
         <View style={styles.register}>
           <CustomTouchable text="already have an account? Sign In" style={{ color: colors.TouchableButtonColor }} onPress={() => {handleLogIn() }} />
         </View>
   
       </View>
  )
}

export default RegisterScreen

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
  },
})