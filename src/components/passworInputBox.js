import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import colors from '../constants/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const PasswordInputBox = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    // const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        maxLength={12}
        secureTextEntry={!passwordVisible}
        placeholderTextColor={colors.TextInput.placeholderColor}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <MaterialIcons
          name={passwordVisible ? "visibility" : "visibility-off"}
          size={24}
          color={colors.iconColor}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.TextInput.borderColor,
        marginTop: 20,
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        marginVertical: 5,
        width: '85%',
        backgroundColor: colors.TextInput.backgroundColor,
        borderRadius: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        backgroundColor: colors.TextInput.backgroundColor,
        height: 55,
        color: colors.TextInput.fontColor,
  },
    icon: {
        paddingHorizontal: 10,
    },
})

export default PasswordInputBox