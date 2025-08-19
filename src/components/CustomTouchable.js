import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomTouchable = ({ text, onPress, style }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, style]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomTouchable

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
})