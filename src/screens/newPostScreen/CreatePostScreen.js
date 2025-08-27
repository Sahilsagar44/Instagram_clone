import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import CameraRoll from "@react-native-camera-roll/camera-roll";
import colors from "../../constants/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

const numColumns = 4;
const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / numColumns;

const CreatePostScreen = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [pageInfo, setPageInfo] = useState({ hasNextPage: true, endCursor: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    if (loading || !pageInfo.hasNextPage) return;
    setLoading(true);

    try {
      const result = await CameraRoll.getPhotos({
        first: 50,
        assetType: "All",
        after: pageInfo.endCursor,
      });

      setPhotos(prev => [...prev, ...result.edges]);

      setPageInfo({
        hasNextPage: result.page_info.has_next_page,
        endCursor: result.page_info.end_cursor,
      });

      console.log("Loaded batch:", result.edges.length, "Next page?", result.page_info.has_next_page);
    } catch (error) {
      console.log("Error fetching photos:", error);
    }

    setLoading(false);
  };

  const renderItem = ({ item }) => {
    const uri = item.node.image.uri;
    return (
      <TouchableOpacity onPress={() => console.log("Selected image URI:", uri)}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.postIconColor} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>New Post</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Go to next step")}>
          <Text style={styles.nextBtn}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        {photos[0] ? (
          <Image source={{ uri: photos[0].node.image.uri }} style={{ width: screenWidth, height: screenWidth }} />
        ) : (
          <View style={{ width: screenWidth, height: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.fontColor }}>No Photos</Text>
          </View>
        )}
      </View>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        onEndReached={() => {
          console.log("End reached!");
          fetchPhotos();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
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
  nextBtn: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.ButtonColor,
  },
  image: {
    width: imageSize - 4,  
    height: imageSize - 4,
    margin: 2,
    borderRadius: 8,
  },
});

export default CreatePostScreen;
