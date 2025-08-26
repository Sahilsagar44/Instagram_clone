import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import { newPostPreviewIcons } from "../../data/IconsData";

const PreviewScreen = ({ route, navigation }) => {
    const { photo } = route.params;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Preview</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("CaptionScreen", { photo })}>
                    <Text style={styles.nextButton}>Next</Text>
                </TouchableOpacity>
            </View>

            <Image source={{ uri: photo }} style={styles.image} resizeMode="contain" />


            <View style={styles.optionsList}>
                {newPostPreviewIcons.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.optionItem]}
                        onPress={() => console.log(item.iconName + ' clicked')}
                    >
                        {item.iconSet === "image" ? (
                            <Image source={item.source} style={styles.optionIcon} />
                        ) : (
                            <Ionicons name={item.name} size={item.size} color={item.color} />
                        )}
                        <Text style={styles.optionTitle}>{item.iconName}</Text>
                        {item.subTxt && <Text style={styles.subtxt}>{item.subTxt}</Text>}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default PreviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "600"
    },
    nextButton: {
        color: colors.ButtonColor,
        fontSize: 18,
        fontWeight: "600"
    },
    image: {
        flex: 1,
        width: "100%"
    },
    optionsList: {
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-evenly",
        gap: 10,

    },
    optionItem: {
        alignItems: "center",
        paddingVertical: 10,
        width: 70,
        borderRadius: 10,
        gap: 4,
        backgroundColor: colors.smallButtonColor,

    },
    optionIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    optionTitle: {
        color: colors.fontColor,
        fontSize: 14,
    },
});
