import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchBox = ({ search, setSearch, showBack, onFocus, onBack }) => {
  const inputRef = useRef(null);

  return (
    <View style={styles.searchRow}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => {
            onBack();
            inputRef.current?.blur();
            Keyboard.dismiss();
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.iconColor} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.inputContainer}>
        {!showBack && (
          <FontAwesome name="search" size={20} color={colors.iconColor} style={styles.icon} />
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
          onFocus={onFocus}
        />
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
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
    color: colors.fontColor,
    height: '100%',
    paddingVertical: 0,
  },
});
