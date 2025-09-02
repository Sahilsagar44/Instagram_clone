import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../constants/colors";
import { ReelPreviewIcons } from "../../../data/IconsData";
import Video from "react-native-video";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReelPreviewScreen = ({ route, navigation }) => {
  const { photo, uri, type, duration, asset, mode } = route.params || {};
  const isFocused = useIsFocused();

  // normalize
  const finalUri = photo || asset?.uri || uri;
  const finalType =
    type || asset?.type || (photo ? "image" : "image"); // default: image
  const finalDuration = duration || asset?.duration || null;

  const handleNext = () => {
    navigation.navigate("CaptionScreen", {
      uri: finalUri,
      type: finalType,
      duration: finalDuration,
      mode,
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Left Close Button with Translucent Background */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Image or Video */}
      {finalType?.startsWith("video") ? (
        <Video
          source={{ uri: finalUri }}
          style={styles.media}
          resizeMode="cover"
          paused={!isFocused}
          repeat
        />
      ) : (
        <Image
          source={{ uri: finalUri }}
          style={styles.media}
          resizeMode="cover"
        />
      )}

      {/* Icon List ScrollView overlaid near bottom of image */}
      <View style={styles.optionsList}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }}
          showsHorizontalScrollIndicator={false}
        >
          {ReelPreviewIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => console.log(item.iconName + ' clicked')}
            >
              {item.iconSet === "image" ? (
                <Image source={item.source} style={styles.optionIcon} />
              ) : (
                <MaterialCommunityIcons name={item.name} size={25} color={colors.postIconColor} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Right Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity onPress={handleNext} style={styles.nextButtonTouchable}>
          <Text style={styles.nextButton}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ReelPreviewScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  media: {
    height: '90%',    
    width: '100%',
    position: 'absolute',
  },
  optionsList: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    paddingVertical: 10,
  },
  optionItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(12, 12, 12, 0.5)',
    marginRight: 4,
  },
  optionIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 20,
  },
  nextButtonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ButtonColor,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  nextButton: {
    color: colors.fontColor,
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
