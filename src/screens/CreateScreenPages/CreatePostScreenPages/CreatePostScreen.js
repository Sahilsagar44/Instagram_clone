// CreatePostScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AssetGrid from './../AssetsGrid';
import colors from './../../../constants/colors';

const CreatePostScreen = ({ navigation }) => {
  const [selectedAsset,setSelectedAsset] = useState(null)

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.postIconColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
        </View>
        <TouchableOpacity  onPress={() => {
            if (selectedAsset) {
              navigation.navigate("PreviewScreen", { asset: selectedAsset });
            }
          }}>
          <Text style={{ color: colors.changeProfileTxt,fontSize:20 }}>next</Text>
        </TouchableOpacity>
      </View>

      <AssetGrid mode="post" numColumns={4} showPreview onSelectAsset={setSelectedAsset} />
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.fontColor,
  },
});
