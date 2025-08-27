import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
import colors from "../../constants/colors";
import { launchImageLibrary } from "react-native-image-picker";

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
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
              
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


  //OPEN GALARY AND SAVE PHOTO OR ALSO SEE'S VIDEO IN THIS FUNCTION
  const openGallery = () => {
    launchImageLibrary(
      {mediaType:"mixed",selectionLimit:1},
      (response) => {
        if(response.didCancel){
          console.log('User cancelled image picker');
        }else if(response.errorCode){
          console.log('picker error', response.errorMessage);
        }
        else if(response.assets && response.assets.length > 0){
          const pickedPhoto = response.assets[0].uri;
          setCapturedPhoto(pickedPhoto);
        }
      }
    )
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
          <TouchableOpacity style={styles.thumbnailWrapper} onPress={openGallery}>
            <Image source={{ uri: capturedPhoto }} style={styles.thumbnail} />
          </TouchableOpacity>
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
  container: { 
    flex: 1, 
    backgroundColor: colors.bgColor
  },
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
    gap: 20
  },
  headerTitle: {
    fontSize: 20,
    color: colors.fontColor,
    fontWeight: "500"
  },
  nextButton: {
    fontSize: 18,
    color: colors.ButtonColor,
    fontWeight: "500"
  },
  cameraContainer: { 
    flex: 1, 
    overflow: "hidden", 
    backgroundColor: colors.bgColor
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
    borderRadius: 10 
  },
});
