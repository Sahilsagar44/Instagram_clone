// CreateReelScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import AssetGrid from './../AssetsGrid';
import colors from './../../../constants/colors';

const CreateReelScreen = () => {
  return (
    <View style={styles.container}>
      <AssetGrid mode="reel" numColumns={3} showPreview={false} />
    </View>
  );
};

export default CreateReelScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor },
});
