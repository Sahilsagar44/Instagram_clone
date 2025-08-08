import {
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/colors';
import SearchBox from '../components/SearchBox';
import OtherUsersData from '../data/otherUsersData';
import ExploreGrid from '../components/ExploreGrid';

const exploreImages = Array.from({ length: 300 }, (_, i) => ({
  id: `exp-${i}`,
  uri: `https://picsum.photos/id/${i + 50}/300/300`,
}));
// const chunkExploreImages = (images) => {
//   const chunks = [];
//   for (let i = 0; i < images.length; i += 5) {
//     chunks.push(images.slice(i, i + 5));
//   }
//   return chunks;
// };

const SearchScreen = () => {
  // const groupedData = chunkExploreImages(exploreImages);

  const [search, setSearch] = useState('');
  const [showBack, setShowBack] = useState(false);

  const handleFocus = () => setShowBack(true);
  const handleBack = () => {
    setShowBack(false);
    setSearch('');
  };

  const filteredUsers = OtherUsersData.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox
        search={search}
        setSearch={setSearch}
        showBack={showBack}
        onFocus={handleFocus}
        onBack={handleBack}
      />

      {showBack && search.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem}>
              <Image source={{ uri: item.profileImage }} style={styles.userImage} />
              <View>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.fullName}>{item.fullName}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No users found</Text>
            </View>
          }
        />
      ) : (
        <ExploreGrid/>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  grid: {
    padding: 1,
    paddingBottom: '16%',
  },
  image: {
    width: '33%',
    aspectRatio: 1,
    margin: 0.5,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.fontColor,
  },
  fullName: {
    fontSize: 13,
    color: '#888',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 15,
    color: '#888',
  },
});
