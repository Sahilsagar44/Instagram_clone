import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useIsFocused } from "@react-navigation/native";
import colors from "../../../constants/colors";

const CameraScreen = ({ navigation, route }) => {
  const { mode = "post" } = route.params || {}; // 👈 mode passed from AssetGrid
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [useBackCamera, setUseBackCamera] = useState(true);

  const cameraRef = useRef(null);
  const device = useCameraDevice(useBackCamera ? "back" : "front");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCapturedPhoto(null);
      openGallery();
    }
  }, [isFocused]);

  const openGallery = async () => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 30,
        assetType: "All",
      });
      setGalleryPhotos(result.edges);
    } catch (error) {
      console.log("CameraRoll error:", error);
    }
  };

  const handleClose = () => {
    navigation?.goBack();
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>No Camera Available</Text>
      </View>
    );
  }

  // CAPTURE PHOTO
  const handleCapturePhoto = async () => {
    try {
      if (cameraRef?.current) {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: "speed",
          flash: flashEnabled ? "on" : "off",
          enableAutoStabilization: true,
        });
        const photoUri = `file://${photo.path}`;
        setCapturedPhoto(photoUri);

        // Navigate based on mode
        if (mode === "story") {
          navigation.navigate("StoryPreviewScreen", { uri: photoUri, type: "photo" });
        } else if (mode === "reel") {
          navigation.navigate("ReelPreviewScreen", { uri: photoUri, type: "photo" });
        } else {
          navigation.navigate("PreviewScreen", { uri: photoUri, type: "photo" });
        }
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFlashEnabled(!flashEnabled)}>
          <Ionicons name={flashEnabled ? "flash" : "flash-off"} size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome name="gear" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          isActive={true}
          device={device}
          photo={true}
        />
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.thumbnailContainer}>
          {galleryPhotos.length > 0 && (
            <Image
              source={{ uri: galleryPhotos[0]?.node?.image?.uri }}
              style={styles.thumbnailImage}
            />
          )}
        </TouchableOpacity>

        {!capturedPhoto && (
          <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setUseBackCamera(!useBackCamera)}>
          <Feather name="refresh-ccw" size={30} color={colors.postIconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    position: "absolute",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 15,
    width: "100%",
    zIndex: 1,
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.bgColor,
  },
  controlsContainer: {
    justifyContent: "space-around",
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.whiteBorder,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.whiteBorder,
  },
  thumbnailContainer: {
    borderRadius: 10,
    borderColor: colors.whiteBorder,
    borderWidth: 2,
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
});
