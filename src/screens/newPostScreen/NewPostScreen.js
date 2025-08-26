import React, { useEffect, useState, useRef } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  Image
} from "react-native";
import { 
  Camera, 
  useCameraDevice, 
  useCameraPermission 
} from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import MiddleContentPostScreen from "./MiddleContentPostScreen";

const NewPostScreen = ({ navigation }) => {
  const [isPermissionLoading, setIsPermissionLoading] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef(null);

  // Permissions check
  useEffect(() => {
    const checkPermissions = async () => {
      setIsPermissionLoading(true);
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (!granted && !hasPermission) {
            await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
          }
        }
        if (!hasPermission) {
          await requestPermission();
        }
      } catch (error) {
        console.error("Permission error:", error);
      } finally {
        setIsPermissionLoading(false);
      }
    };
    checkPermissions();
  }, [hasPermission, requestPermission]);

  // Handle close
  const handleClose = () => {
    navigation?.goBack();
  };

  // Main camera screen
  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>No Camera Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
        </View>
        <TouchableOpacity
          disabled={!capturedPhoto}
          onPress={() =>
            navigation.navigate("PreviewScreen", { photo: capturedPhoto })
          }
        >
          <Text
            style={[
              styles.nextButton,
              { opacity: capturedPhoto ? 1 : 0.5 },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />

        {/* Thumbnail Preview */}
        {capturedPhoto && (
          <View style={styles.thumbnailWrapper}>
            <Image source={{ uri: capturedPhoto }} style={styles.thumbnail} />
          </View>
        )}
      </View>

      {/* Capture button controls */}
      <MiddleContentPostScreen
        cameraRef={cameraRef}
        setCapturedPhoto={setCapturedPhoto}
      />
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 15,
    zIndex: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 20 },
  headerTitle: { fontSize: 20, color: "#fff", fontWeight: "500" },
  nextButton: { fontSize: 18, color: "#3797EF", fontWeight: "500" },
  cameraContainer: { flex: 1, overflow: "hidden", backgroundColor: "black" },
  thumbnailWrapper: {
    position: "absolute",
    bottom: 120,
    left: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  thumbnail: { width: 60, height: 60, borderRadius: 10 },
});
