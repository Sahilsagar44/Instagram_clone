import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import React from "react";

const MiddleContentPostScreen = ({ cameraRef, setCapturedPhoto }) => {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={async () => {
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
        }}
      >
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>
    </View>
  );
};

export default MiddleContentPostScreen;

const styles = StyleSheet.create({
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
