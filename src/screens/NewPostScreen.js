import React, { useEffect, useState, useRef } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Linking,
  Alert,
  Platform,
  PermissionsAndroid
} from "react-native";
import { 
  Camera, 
  useCameraDevice, 
  useCameraPermission 
} from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";

const NewPostScreen = ({ navigation }) => {
  const [isPermissionLoading, setIsPermissionLoading] = useState(true);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      setIsPermissionLoading(true);
      
      try {
        // For Android, also check native permissions as fallback
        if (Platform.OS === 'android') {
          const cameraGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          
          if (!cameraGranted && !hasPermission) {
            const androidPermissions = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
            
            const cameraPermissionGranted = 
              androidPermissions['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED;
              
            if (!cameraPermissionGranted) {
              // Try Vision Camera permission as fallback
              await requestPermission();
            }
          } else if (!hasPermission) {
            await requestPermission();
          }
        } else {
          // For iOS, use Vision Camera permission
          if (!hasPermission) {
            await requestPermission();
          }
        }
      } catch (error) {
        console.error('Permission error:', error);
      } finally {
        setIsPermissionLoading(false);
      }
    };

    checkAndRequestPermissions();
  }, [hasPermission, requestPermission]);

  // Handle close
  const handleClose = () => {
    navigation?.goBack();
  };

  // Handle permission request
  const handleRequestPermission = async () => {
    try {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera permission to use this feature. You can enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert(
        'Permission Error',
        'There was an error requesting camera permission. Please try enabling it manually in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      );
    }
  };

  // Show loading state while checking permissions
  if (isPermissionLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Post</Text>
          </View>
        </View>
        
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={50} color="#fff" />
          <Text style={styles.permissionText}>Checking camera permissions...</Text>
        </View>
      </View>
    );
  }

  // Show permission request screen
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Post</Text>
          </View>
        </View>

        <View style={styles.permissionContainer}>
          <Ionicons name="camera-off-outline" size={50} color="#fff" />
          <Text style={styles.permissionText}>
            Camera access is required to take photos and videos.
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleRequestPermission}
          >
            <Text style={styles.settingsButtonText}>Grant Camera Permission</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.settingsButton, styles.secondaryButton]}
            onPress={() => Linking.openSettings()}
          >
            <Text style={[styles.settingsButtonText, styles.secondaryButtonText]}>
              Open Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show error if no camera device available
  if (device == null) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Post</Text>
          </View>
        </View>

        <View style={styles.permissionContainer}>
          <Ionicons name="camera-off-outline" size={50} color="#fff" />
          <Text style={styles.permissionText}>
            Camera not available on this device.
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleClose}
          >
            <Text style={styles.settingsButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main camera screen
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
        <TouchableOpacity>
          <Text style={styles.nextButton}>Next</Text>
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
      </View>

      {/* Bottom Capture Button */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={async () => {
            try {
              if (cameraRef.current) {
                const photo = await cameraRef.current.takePhoto({
                  qualityPrioritization: 'speed',
                  flash: 'off',
                  enableAutoStabilization: true,
                });
                console.log("Captured photo:", photo.path);
                // Navigate to preview/edit screen with photo
                // navigation.navigate('PhotoPreview', { photoPath: photo.path });
              }
            } catch (error) {
              console.error('Error taking photo:', error);
              Alert.alert('Error', 'Failed to take photo. Please try again.');
            }
          }}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 15,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  nextButton: {
    fontSize: 18,
    color: "#3797EF",
    fontWeight: "500",
  },
  cameraContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  settingsButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#3797EF",
    borderRadius: 10,
    minWidth: 200,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3797EF",
  },
  settingsButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  secondaryButtonText: {
    color: "#3797EF",
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
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
});
