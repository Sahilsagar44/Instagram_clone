// CreateStoryScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import AssetGrid from './../AssetsGrid';
import colors from './../../../constants/colors';

const CreateStoryScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <AssetGrid mode="story" numColumns={3} showPreview={false} />
    </View>
  );
};

export default CreateStoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor },
});
