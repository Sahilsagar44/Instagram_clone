import React, { useRef, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  Platform, 
  Alert 
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../constants/colors";
import { launchImageLibrary } from "react-native-image-picker";
import { GestureDetector } from 'react-native-gesture-handler';

const CameraScreen = ({ navigation }) => {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const device = useCameraDevice("back");
  const cameraRef = useRef(null);

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

  const GestureDetector = (gesture) => {
    console.log("Gesture detected",gesture);
    return (
      <GestureDetector>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      </GestureDetector>
    );
  };

  // OPEN GALLERY
  const openGallery = () => {
    launchImageLibrary({ mediaType: "mixed", selectionLimit: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("picker error", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const pickedPhoto = response.assets[0].uri;
        setCapturedPhoto(pickedPhoto);
      }
    });
  };

  // CAPTURE PHOTO
  const handleCapturePhoto = async () => {
    console.log("Capture photo button pressed");
    try {
      if (cameraRef?.current) {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: "speed",
          flash: "off",
          enableAutoStabilization: true,
        });
        setCapturedPhoto(`file://${photo.path}`);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
        </View>
        <TouchableOpacity
          disabled={!capturedPhoto}
          onPress={() => navigation.navigate("PreviewScreen", { photo: capturedPhoto })}
        >
          <Text style={[styles.nextButton, { opacity: capturedPhoto ? 1 : 0.5 }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <Camera 
          ref={cameraRef} 
          style={StyleSheet.absoluteFill} 
          device={device} 
          isActive={true} 
          photo={true} 
         
        />

        {capturedPhoto && (
          <TouchableOpacity style={styles.thumbnailWrapper} onPress={openGallery}>
            <Image source={{ uri: capturedPhoto }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 15,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: colors.fontColor,
    fontWeight: "500",
  },
  nextButton: {
    fontSize: 18,
    color: colors.ButtonColor,
    fontWeight: "500",
  },
  cameraContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.bgColor,
  },
  thumbnailWrapper: {
    position: "absolute",
    bottom: 120,
    left: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.whiteBorder,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
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
});
