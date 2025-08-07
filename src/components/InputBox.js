import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import colors from '../constants/colors'

const InputBox = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.TextInput.placeholderColor}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        marginBottom: 5,
        width: '85%',

    },
  input: {
    borderWidth: 1,
    borderColor: colors.TextInput.borderColor,
    borderRadius: 5,
    backgroundColor: colors.TextInput.backgroundColor,
    height: 60,
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 10,
  },
})

export default InputBox