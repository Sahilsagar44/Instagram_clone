import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Switch } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from "../../../constants/colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MusicData from "../../../data/MusicData";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from "react-native-video";

const nearbyLocations = ["Starbucks Coffee", "Central Park", "Times Square", "Madison Square Garden", "Empire State Building", "Fifth Avenue", "Rockefeller Center", "Brooklyn Bridge", "Grand Central Terminal", "Bryant Park"];

const CaptionScreen = ({ route, navigation }) => {
    const { photo, video, uri, type, duration } = route.params || {};
    const finalAsset = {
        uri: photo || video || uri,
        type: type || (video ? "video" : photo ? "image" : null),
        duration: duration
    };
    const [caption, setCaption] = useState("");

    const handleShare = () => {
        console.log("Sharing photo:", photo, "Caption:", caption);
        navigation.popToTop();
    };

    const toggleSwitch = () => setIsEnabled(prev => !prev);
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="close-outline" size={32} color={colors.fontColor} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Post</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.previewContainer}>
                    {finalAsset.type?.startsWith("video") ? (
                        <Video source={{ uri: finalAsset.uri }} style={styles.bigImage} resizeMode="contain" paused />
                    ) : finalAsset.uri ? (
                        <Image source={{ uri: finalAsset.uri }} style={styles.bigImage} />
                    ) : <Text style={{ color: colors.fontColor }}>No media selected</Text>}
                </View>

                <TextInput
                    style={styles.captionInput}
                    placeholder="Write a caption..."
                    placeholderTextColor="#777"
                    value={caption}
                    onChangeText={setCaption}
                    multiline
                />

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn}>
                        <Feather
                            name="bar-chart-2"
                            size={14}
                            color={colors.postIconColor}
                            style={{ transform: [{ rotate: "90deg" }] }}
                        />
                        <Text style={styles.btntxt}>Poll</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Feather
                            name="message-circle"
                            size={14}
                            color={colors.postIconColor}
                            style={{ transform: [{ scaleX: -1 }] }}
                        />
                        <Text style={styles.btntxt}>Prompt</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mentionsBtnContainer}>
                    <TouchableOpacity style={styles.mentionsBtn}>
                        <View style={styles.mentionsBtnContent}>
                            <Feather name='user' color={colors.postIconColor} size={26} />
                            <Text style={[styles.btntxt, { fontSize: 18 }]} >Tag People</Text>
                        </View>
                        <MaterialIcons name='arrow-forward-ios' color={colors.iconColor} size={22} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mentionsBtn}>
                        <View style={styles.mentionsBtnContent}>
                            <MaterialCommunityIcons name='map-marker-outline' color={colors.postIconColor} size={26} />
                            <Text style={[styles.btntxt, { fontSize: 18 }]}>Tag People</Text>
                        </View>
                        <MaterialIcons name='arrow-forward-ios' color={colors.iconColor} size={22} />
                    </TouchableOpacity>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {nearbyLocations.map((loc, index) => (
                            <TouchableOpacity key={index} style={[styles.btn, { marginRight: 8 }]}>
                                <Text style={styles.btntxt}>{loc}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.mentionsBtn}>
                        <View style={styles.mentionsBtnContent}>
                            <MaterialCommunityIcons name='music' color={colors.postIconColor} size={26} />
                            <Text style={[styles.btntxt, { fontSize: 18 }]}>Add music</Text>
                        </View>
                        <MaterialIcons name='arrow-forward-ios' color={colors.iconColor} size={22} />
                    </TouchableOpacity>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {MusicData.map((loc, index) => (
                            <TouchableOpacity key={index} style={[styles.btn, { marginRight: 8 }]}>
                                <Image source={{ uri: loc.photo }}
                                    style={{ height: 28, width: 28, resizeMode: 'contain', borderRadius: 5 }} />
                                <Text style={styles.btntxt}>{loc.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={styles.threadsBadgeContainer}
                    activeOpacity={0.8}
                    onPress={toggleSwitch}
                >
                    <Ionicons name='tablet-portrait-outline' size={25} color={colors.postIconColor} />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.badgeTxt}>Show Threads badge</Text>
                        <Text style={styles.subBadgeTxt}>
                            When turned off, the Instagram badge on your Threads profile will also disappear.
                        </Text>
                    </View>
                    <Switch
                        style={styles.badgeSwitch}
                        trackColor={{ false: colors.borderColor, true: colors.changeProfileTxt }}
                        thumbColor={isEnabled ? colors.postIconColor : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </TouchableOpacity>

                <View style={{ borderBottomColor: colors.borderTopColor, borderWidth: 2 }}>
                    <TouchableOpacity style={styles.mentionsBtn}>
                        <View style={styles.mentionsBtnContent}>
                            <MaterialCommunityIcons name='eye' color={colors.postIconColor} size={26} />
                            <Text style={[styles.btntxt, { fontSize: 18 }]}>Audience</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text style={[styles.btntxt, { fontSize: 14, color: colors.subFontColor }]}>Followers</Text>
                            <MaterialIcons name='arrow-forward-ios' color={colors.iconColor} size={22} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mentionsBtn}>
                        <View style={styles.mentionsBtnContent}>
                            <Ionicons name='share-outline' color={colors.postIconColor} size={26} />
                            <Text style={[styles.btntxt, { fontSize: 18 }]}>Also Share on</Text>
                        </View>
                        <MaterialIcons name='arrow-forward-ios' color={colors.iconColor} size={22} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Sticky Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleShare}
                    disabled={!caption}
                >
                    <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>

            </View>



        </KeyboardAvoidingView>
    );
};

export default CaptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingTop: Platform.OS === "ios" ? 55 : 15,
        paddingHorizontal: 18,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderTopColor,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    headerTitle: {
        fontSize: 20,
        color: colors.fontColor,
        fontWeight: "600",
    },
    scrollContent: {
        padding: 16,
    },
    bigImage: {
        width: "60%",
        height: 280,
        resizeMode: "cover",
        borderRadius: 20,
        marginBottom: 15,
        alignSelf:'center'
    },
    captionInput: {
        color: colors.fontColor,
        fontSize: 16,
        borderRadius: 8,
        marginBottom: 25,
    },
    btnContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderTopColor,
        paddingVertical: 10,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 5,
        backgroundColor: colors.smallButtonColor,
        borderRadius: 8,
    },
    btntxt: {
        color: colors.fontColor,
        fontSize: 12,
        fontWeight: "500",
    },
    mentionsBtnContainer: {
        gap: 2,
    },
    mentionsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',

    },
    mentionsBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bottomBar: {
        borderTopWidth: 0.5,
        borderTopColor: colors.borderTopColor,
        padding: 12,
        backgroundColor: colors.bgColor,
    },
    shareButton: {
        backgroundColor: colors.ButtonColor,
        paddingVertical: 14,
        borderRadius: 10,
    },
    shareText: {
        color: "white",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "600",
    },
    threadsBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 15,
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    badgeTextContainer: {
        flex: 1,
        marginRight: 10
    },
    badgeTxt: {
        color: colors.fontColor,
        fontSize: 16,
        fontWeight: '500'
    },
    subBadgeTxt: {
        color: colors.subFontColor,
        fontSize: 14,
        lineHeight: 18,
        marginTop: 3
    },
    previewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        //  borderRadius: 20, // Add this line
        // overflow: 'hidden',
    },

});
