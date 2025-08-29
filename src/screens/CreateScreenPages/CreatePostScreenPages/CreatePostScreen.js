import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import colors from "../../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Video from "react-native-video";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const numColumns = 4;
const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / numColumns;

const CreatePostScreen = ({ navigation, mode }) => {
  const [photos, setPhotos] = useState([]);
  const [pageInfo, setPageInfo] = useState({ hasNextPage: true, endCursor: null });
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [videoDurations, setVideoDurations] = useState({});
  const isFocused = useIsFocused();

  const handleVideoLoad = (uri, duration) => {
    setVideoDurations((prev) => ({ ...prev, [uri]: duration }));
  };

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds <= 0) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (photos.length > 0 && !selectedAsset) {
      const first = photos[0];
      setSelectedAsset({
        uri: first.node.image.uri,
        type: first.node.type,
        duration: videoDurations[first.node.image.uri],
        image: first.node.image,
      });
    }
  }, [photos, selectedAsset]);

  const fetchPhotos = async () => {
    if (loading || !pageInfo.hasNextPage) return;
    setLoading(true);

    try {
      const result = await CameraRoll.getPhotos({
        first: 30,
        assetType: "All",
        after: pageInfo.endCursor,
      });

      setPhotos((prev) => [...prev, ...result.edges]);
      setPageInfo({
        hasNextPage: result.page_info.has_next_page,
        endCursor: result.page_info.end_cursor,
      });
    } catch (error) {
      console.log("Error fetching photos:", error);
    }

    setLoading(false);
  };

  const renderItem = ({ item }) => {
    if (item.isCamera) {
      return (
        <TouchableOpacity style={styles.cameraContainer} onPress={() => navigation.navigate("CameraScreen")}>
          <Ionicons name="camera" size={28} color={colors.fontColor} />
        </TouchableOpacity>
      );
    }
    const { uri } = item.node.image;
    const { type } = item.node;
    const duration = videoDurations[uri];

    return (
      <TouchableOpacity onPress={() => setSelectedAsset({ uri, type, duration, image: item.node.image })}>
        <Image source={{ uri }} style={styles.image} />
        {type?.startsWith("video") && (
          <>
            {!duration && (
              <Video
                source={{ uri }}
                style={{ width: 0, height: 0 }}
                onLoad={(data) => handleVideoLoad(uri, data.duration)}
                paused={!isFocused ? true : false}
              />
            )}
            {duration && (
              <View style={styles.durationOverlay}>
                <Text style={styles.durationText}>{formatDuration(duration)}</Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

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
        <TouchableOpacity
          disabled={!selectedAsset}
          onPress={() =>
            navigation.navigate("PreviewScreen", {
              uri: selectedAsset?.uri,
              type: selectedAsset?.type,
              duration: selectedAsset?.duration,
            })
          }
        >
          <Text style={[styles.nextBtn, !selectedAsset ? { opacity: 0.6 } : {}]}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        {selectedAsset &&
          (selectedAsset.type?.startsWith("video") ? (
            <Video
              key={selectedAsset.uri}
              source={{ uri: selectedAsset.image.uri }}
              style={styles.previewImage}
              repeat
              resizeMode="contain"
              paused={!isFocused ? true : false}
            />
          ) : (

            <Image source={{ uri: selectedAsset.image.uri }} style={styles.previewImage} />
          ))}
      </View>

      {/* Gallery */}
      <FlatList
        data={[{ isCamera: true }, ...photos]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        onEndReached={fetchPhotos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        contentContainerStyle={{ paddingVertical: 12 }}
        initialNumToRender={12}
        maxToRenderPerBatch={8}
        windowSize={3}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
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
    color: colors.fontColor
  },
  nextBtn: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.ButtonColor
  },
  image: {
    width: imageSize - 4,
    height: imageSize - 4,
    margin: 2,
    borderRadius: 8
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 8,
    backgroundColor: colors.cameraBgColor,
  },
  previewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15
  },
  previewImage: {
    resizeMode: "contain",
    width: "100%",
    height: 300
  },
  durationOverlay: {
    position: "absolute",
    right: 4,
    bottom: 4
  },
  durationText: {
    color: colors.fontColor,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.3
  },
});
