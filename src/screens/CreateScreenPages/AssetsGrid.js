// components/AssetGrid.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Video from "react-native-video";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import colors from './../../constants/colors';
import { FlashList } from "@shopify/flash-list";

const screenWidth = Dimensions.get("window").width;

const AssetGrid = ({ mode = "post", numColumns = 4, showPreview = true,onSelectAsset }) => {
  const [photos, setPhotos] = useState([]);
  const [pageInfo, setPageInfo] = useState({ hasNextPage: true, endCursor: null });
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [videoDurations, setVideoDurations] = useState({});
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const CACHE_KEY = `cached_photos_${mode}`;
  const imageSize = screenWidth / numColumns;

  const handleVideoLoad = (uri, duration) => {
    setVideoDurations((prev) => ({ ...prev, [uri]: duration }));
  };

//   const formatDuration = (seconds) => {
//     if (!seconds || isNaN(seconds) || seconds <= 0) return "--:--";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
   if (photos.length > 0 && !selectedAsset && showPreview) {
      const first = photos[0];
      const firstAsset = {
        uri: first.node.image.uri,
        type: first.node.type,
        duration: videoDurations[first.node.image.uri],
        image: first.node.image,
      };
      setSelectedAsset(firstAsset);
      onSelectAsset && onSelectAsset(firstAsset);
    }
  }, [photos, selectedAsset, showPreview]);

  const fetchPhotos = async () => {
    if (loading || !pageInfo.hasNextPage) return;
    setLoading(true);

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached && photos.length === 0) {
        setPhotos(JSON.parse(cached));
      }

      const result = await CameraRoll.getPhotos({
        first: 20,
        assetType: "All",
        after: pageInfo.endCursor,
      });

      const newPhotos = [...photos, ...result.edges];
      setPhotos(newPhotos);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newPhotos));

      setPageInfo({
        hasNextPage: result.page_info.has_next_page,
        endCursor: result.page_info.end_cursor,
      });
    } catch (error) {
      console.log("Error fetching photos:", error);
    }

    setLoading(false);
  };

  const handleAssetPress = (asset) => {
    const data = {
      uri: asset.node.image.uri,
      type: asset.node.type,
      duration: videoDurations[asset.node.image.uri],
      image: asset.node.image,
    };

    if (showPreview) {
    // Post mode → just update preview
    setSelectedAsset(data);
    onSelectAsset && onSelectAsset(data);
  } else {
    // Story / Reel / Post → navigate based on mode
    let targetScreen = "PostPreviewScreen"; // default

    if (mode === "story") targetScreen = "StoryPreviewScreen";
    if (mode === "reel") targetScreen = "ReelPreviewScreen";

    navigation.navigate(targetScreen, {
      asset: data,
    });
  }
};

  const renderItem = ({ item }) => {
    if (item.isCamera) {
      return (
        <TouchableOpacity
          style={[styles.cameraContainer, { width: imageSize - 4, height: imageSize - 4 }]}
          onPress={() => navigation.navigate("CameraScreen", { mode })}
        >
          <Ionicons name="camera" size={28} color={colors.fontColor} />
        </TouchableOpacity>
      );
    }

    const { uri } = item.node.image;
    const { type } = item.node;
    const duration = videoDurations[uri];

    return (
      <TouchableOpacity onPress={() => handleAssetPress(item)}>
        <Image source={{ uri }} style={[styles.image, { width: imageSize - 4, height: imageSize - 4 }]} />
        {type?.startsWith("video") && (
          <>
            {duration && (
            //   <Video
            //     source={{ uri }}
            //     style={{ width: 0, height: 0 }}
            //     onLoad={(data) => handleVideoLoad(uri, data.duration)}
            //     paused
            //   />
                <Image  source={{ uri }} style={{ width: 0, height: 0 }} onLoad={(data) => handleVideoLoad(uri, data.duration)}/>
            )}
            {/* {duration && (
              <View style={styles.durationOverlay}>
                <Text style={styles.durationText}>{formatDuration(duration)}</Text>
              </View>
            )} */}
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlashList
      data={[{ isCamera: true }, ...photos]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      numColumns={numColumns}
      onEndReached={fetchPhotos}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      contentContainerStyle={{ paddingVertical: 12 }}
      accessibilityShowsLargeContentViewer
      ListHeaderComponent={
        showPreview && selectedAsset ? (
          <View style={styles.previewContainer}>
            {selectedAsset.type?.startsWith("video") ? (
              <Video
                key={selectedAsset.uri}
                source={{ uri: selectedAsset.image.uri }}
                style={styles.previewImage}
                repeat
                resizeMode="contain"
                // paused={isVideoPlaying}
                paused={!isFocused} // Pause when screen is not focused
              />
            ) : (
              <Image source={{ uri: selectedAsset.image.uri }} style={styles.previewImage} />
            )}
          </View>
        ) : null
      }
    />
  );
};

export default AssetGrid;

const styles = StyleSheet.create({
  image: {
    margin: 2,
    borderRadius: 8,
  },
  cameraContainer: {
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
    paddingHorizontal: 15,
  },
  previewImage: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
  },
  durationOverlay: {
    position: "absolute",
    right: 4,
    bottom: 4,
  },
  durationText: {
    color: colors.fontColor,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
});
