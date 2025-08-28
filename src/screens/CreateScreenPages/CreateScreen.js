import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useCameraPermission } from "react-native-vision-camera";
import colors from "../../constants/colors";

import CreatePostScreen from "./CreatePostScreenPages/CreatePostScreen";
import CreateReelScreen from "./CreateReelScreenPages/CreateReelScreen";
import CreateStoryScreen from "./CreateStoryScreenPages/CreateStoryScreen";
import CreateLiveScreen from "./CreateLiveScreenPages/CreateLiveScreen";

const TABS = ["Post", "Reel", "Story", "Live"];

const CreateScreen = ({ navigation }) => {
  const [isPermissionLoading, setIsPermissionLoading] = useState(true);
  const { hasPermission, requestPermission } = useCameraPermission();
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const checkPermissions = async () => {
      setIsPermissionLoading(true);
      try {
        if (Platform.OS === "android") {
          if (Platform.Version >= 33) {
            await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]);
          } else {
            await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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

  return (
    <View style={styles.container}>
      {/* 🔹 PagerView */}
      <PagerView
        style={{ flex: 1,position:'relative' }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View key="1">
          <CreatePostScreen navigation={navigation} />
        </View>
        <View key="2">
          <CreateReelScreen />
        </View>
        <View key="3">
          <CreateStoryScreen />
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
    borderRadius:30,
    position:'absolute',
    backgroundColor:colors.tabBarBgColor,
    bottom:20,
    marginHorizontal:40,
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
