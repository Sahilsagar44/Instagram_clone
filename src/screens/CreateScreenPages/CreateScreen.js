import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Camera, useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import colors from "../../constants/colors";

import CreatePostScreen from "./CreatePostScreenPages/CreatePostScreen";
import CreateReelScreen from "./CreateReelScreenPages/CreateReelScreen";
import CreateStoryScreen from "./CreateStoryScreenPages/CreateStoryScreen";
import CreateLiveScreen from "./CreateLiveScreenPages/CreateLiveScreen";

const TABS = ["Post", "Story", "Reel", "Live"];

const CreateScreen = ({ navigation }) => {
  const [isPermissionLoading, setIsPermissionLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  const { status: cameraStatus, requestPermission: requestCamera } = useCameraPermission();
  const { status: micStatus, requestPermission: requestMic } = useMicrophonePermission();

  useEffect(() => {
    const checkPermissions = async () => {
      setIsPermissionLoading(true);
      try {
        // Android Permissions
        if (Platform.OS === "android") {
          const perms = Platform.Version >= 33
            ? [
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
              ]
            : [
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              ];
          const result = await PermissionsAndroid.requestMultiple(perms);
          const allGranted = Object.values(result).every(r => r === PermissionsAndroid.RESULTS.GRANTED);
          if (!allGranted) {
            Alert.alert("Permissions required", "Camera, microphone, and storage permissions are required.");
            setPermissionGranted(false);
            setIsPermissionLoading(false);
            return;
          }
        }

        // iOS Permissions using vision-camera
        if (Platform.OS === "ios") {
          if (cameraStatus !== "authorized") {
            await requestCamera();
          }
          if (micStatus !== "authorized") {
            await requestMic();
          }
        }

        // Final check
        if ((Platform.OS === "ios" && cameraStatus === "authorized" && micStatus === "authorized") || Platform.OS === "android") {
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
          Alert.alert("Permissions required", "Camera or microphone permission is denied.");
        }
      } catch (error) {
        console.error("Permission error:", error);
        setPermissionGranted(false);
      } finally {
        setIsPermissionLoading(false);
      }
    };

    checkPermissions();
  }, [cameraStatus, micStatus]);

  if (isPermissionLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.ButtonColor} />
        <Text style={{ color: colors.fontColor, marginTop: 10 }}>
          Checking permissions...
        </Text>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.fontColor, textAlign: "center", paddingHorizontal: 20 }}>
          Camera, microphone, or storage permissions are required to use this feature.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View key="1">
          <CreatePostScreen navigation={navigation} />
        </View>
        <View key="2">
          <CreateStoryScreen  />
        </View>
        <View key="3">
          <CreateReelScreen />
        </View>
        <View key="4">
          <CreateLiveScreen />
        </View>
      </PagerView>

      <View style={styles.bottomTabs}>
        {TABS.map((label, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              pagerRef.current?.setPage(index);
              setPage(index);
            }}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                page === index && styles.activeTabText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  center: {
    flex: 1,
    backgroundColor: colors.bgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: colors.tabBarBgColor,
    bottom: 20,
    marginHorizontal: 40,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: colors.fontColor,
    fontWeight: "600",
  },
  activeTabText: {
    color: colors.ButtonColor,
    fontWeight: "700",
  },
});
