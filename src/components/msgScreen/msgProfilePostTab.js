import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MsgProfilePostTab = () => {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 100 }).map((_, index) => (
        <Text key={index} style={styles.item}>
          msgProfilePostTab {index + 1}
        </Text>
      ))}
    </ScrollView>
  )
}

export default MsgProfilePostTab

const styles = StyleSheet.create({
  container: {
    flex: 1,  // 👈 important so tab takes available height
  },
  contentContainer: {
    padding: 16,
  },
  item: {
    marginVertical: 8,
    fontSize: 16,
    color: 'black',
  },
})
