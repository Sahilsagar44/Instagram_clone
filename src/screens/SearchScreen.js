import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import React, { useState, useRef } from 'react'
import colors from '../constants/colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const dummyImages = Array.from({ length: 30 }, (_, i) => ({
  id: i.toString(),
  uri: `https://picsum.photos/id/${i + 10}/300/300`,
}))

const SearchScreen = () => {
  const [search, setSearch] = useState('')
  const [showBack, setShowBack] = useState(false)
  const inputRef = useRef(null)

  const handleClear = () => setSearch('')
  const handleFocus = () => setShowBack(true)
  const handleBack = () => {
    setShowBack(false)
    setSearch('')
    inputRef.current?.blur()
    Keyboard.dismiss()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        {showBack ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.iconColor} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.inputContainer}>
          {!showBack && (
            <FontAwesome name='search' size={20} color={colors.iconColor} style={styles.icon} />
          )}
          <TextInput
            ref={inputRef}
            style={styles.searchBox}
            placeholder="Search"
            placeholderTextColor={colors.TextInput.placeholderColor || '#888'}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={handleFocus}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <MaterialIcons name="close" size={20} color={colors.iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={dummyImages}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        keyboardShouldPersistTaps="handled"

      />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
    borderRadius: 50,
    backgroundColor: colors.TextInput.backgroundColor,
    borderWidth: 1,
    borderColor: colors.TextInput.borderColor,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.TextInput.backgroundColor,
    borderWidth: 1,
    borderColor: colors.TextInput.borderColor,
    paddingHorizontal: 12,
    height: 45,
  },
  icon: {
    marginRight: 6,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: colors.TextInput.fontColor,
    height: '100%',
    paddingVertical: 0,
  },
  grid: {
    padding: 1,
  },
  image: {
    width: '33%',
    aspectRatio: 1,
    margin: 0.5,
  },
})
