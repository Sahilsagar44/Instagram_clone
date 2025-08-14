import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Switch
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
import user from '../../data/userData';
import EditTextinput from '../../components/EditTextinput';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
    const navigation=useNavigation()
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(prev => !prev);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color={colors.postIconColor} />
                </TouchableOpacity>
                <Text style={styles.headerTxt}>Edit Profile</Text>
            </View>

            {/* Scrollable content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* Profile Picture */}
                <View style={styles.profilePictureContainer}>
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    <TouchableOpacity>
                        <Text style={styles.changePicture}>Change Profile Picture</Text>
                    </TouchableOpacity>
                </View>

                {/* Input fields */}
                <View style={styles.inputSection}>
                    <EditTextinput label="Name" value={user.fullName} editable={false} />
                    <EditTextinput label="Username" value={user.username} editable={false} />
                    <EditTextinput
                        label="Pronouns"
                        value={user.pronouns}
                        editable={false}
                        placeholder="Pronouns"
                    />
                    <EditTextinput label="Bio" value={user.bio} editable={false} />
                </View>

                {/* Links */}
                <TouchableOpacity>
                    <Text style={styles.addLinktxt}>Add link</Text>
                </TouchableOpacity>

                {/* Banners */}
                <TouchableOpacity style={styles.bannerRow}>
                    <Text style={styles.addLinktxt}>Banners</Text>
                    <Text style={styles.bannerCount}>
                        {user.banners ? user.banners.length : 0}
                    </Text>
                </TouchableOpacity>

                {/* Gender */}
                <View style={styles.inputSection}>
                    <EditTextinput label="Gender" value={user.gender} editable={false} />
                </View>

                {/* Music Row */}
                <TouchableOpacity style={styles.musicRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.fontColor }}>Music</Text>
                    </View>
                    <Text style={{ color: colors.subFontColor }}>Add music to your Profile</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={20}
                        color={colors.iconColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.threadsBadgeContainer}
                    activeOpacity={0.8}
                    onPress={toggleSwitch}
                >
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
                
                <TouchableOpacity style={styles.threadsBadgeContainer}
                    activeOpacity={0.8}>
                    <Text style={[styles.changePicture,{fontSize:16}]}>Switch to profetional account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.threadsBadgeContainer}
                    activeOpacity={0.8}>
                    <Text style={[styles.changePicture,{fontSize:16}]}>Personal information settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.threadsBadgeContainer}
                    activeOpacity={0.8}>
                    <Text style={[styles.changePicture,{fontSize:16}]}>Show that your profile is verified</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor
    },
    header: {
        marginTop: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25
    },
    headerTxt: {
        color: colors.fontColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    profilePictureContainer: {
        marginTop: 30,
        alignItems: 'center',
        gap: 10
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 50
    },
    changePicture: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.changeProfileTxt
    },
    inputSection: {
        marginTop: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        gap: 18
    },
    addLinktxt: {
        color: colors.fontColor,
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20
    },
    bannerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerCount: {
        color: colors.subFontColor,
        marginRight: 20
    },
    musicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomWidth: 2,
        borderBottomColor: colors.borderColor,
        // paddingHorizontal: 20,
        marginHorizontal: 20,
        paddingVertical: 12
    },
    threadsBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
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
    }
});
