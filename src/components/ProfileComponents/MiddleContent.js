import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import user from '../../data/userData'
import colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const MiddleContent = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.profileRow}>

                <View style={styles.ProfileImageContainer}>
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    <TouchableOpacity style={styles.imagePlus}>
                        <Image
                            source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/plus(1).png')}
                            style={styles.overlapImage}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.rightContent}>
                    <Text style={styles.name}>{user.fullName}</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.startBox}>
                            <Text style={styles.startNumber}>{user.posts.length}</Text>
                            <Text style={styles.startLabel}>Posts</Text>
                        </View>
                        <View style={styles.startBox}>
                            <Text style={styles.startNumber}>{user.followerCount}</Text>
                            <Text style={styles.startLabel}>Followers</Text>
                        </View>
                        <View style={styles.startBox}>
                            <Text style={styles.startNumber}>{user.followingCount}</Text>
                            <Text style={styles.startLabel}>Following</Text>
                        </View>
                    </View>
                </View>

            </View>

            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.userName}><Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/threads.png')} style={{ width: 13, height: 13 }} /> {user.username}</Text>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.Profile} activeOpacity={0.4} onPress={() => navigation.navigate('EditProfileScreen')}>
                    <Text style={styles.editProfileTxt}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Profile} activeOpacity={0.4} onPress={() => navigation.navigate('shareProfilePage')}>
                    <Text style={styles.editProfileTxt}>Share Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inviteBtn} activeOpacity={0.4}>
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/invite.png')} style={styles.invite} />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsScroll}>
                <TouchableOpacity style={styles.highlightItem}>
                    <View style={styles.addHighlightCircle}>
                        <Text style={styles.addHighlightPlus}>+</Text>
                    </View>
                    <Text style={styles.highlightTitle}>New</Text>
                </TouchableOpacity>

                {user.highlights.map((item, index) => (
                    <TouchableOpacity style={styles.highlightItem}
                        key={item.id}
                        onPress={() => navigation.navigate('ProfileHighlightStory', { startIndex: index })}>
                        <Image source={{ uri: item.image }} style={styles.highlightImage} />
                        <Text style={styles.highlightTitle}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default MiddleContent

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    rightContent: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ProfileImageContainer: {
        position: 'relative'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    imagePlus: {
        position: 'absolute',
        borderColor: colors.borderColor,
        bottom: 0,
        right: 0,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlapImage: {
        width: 25,
        borderWidth: 2,
        borderRadius: 20,
        height: 25,
        backgroundColor: colors.bgColor
    },
    txt: {
        fontSize: 12,
        color: colors.fontColor,
        marginBottom: 50
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    startBox: {
        alignItems: 'center'
    },
    startNumber: {
        color: colors.fontColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    startLabel: {
        color: colors.fontColor,
        fontSize: 14,
    },
    name: {
        color: colors.fontColor,
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 5,
    },
    bio: {
        color: colors.fontColor,
        fontSize: 14,
        marginTop: 4,
    },
    userName: {
        color: colors.fontColor,
        fontSize: 16,
        marginTop: 4,
        fontWeight: 'bold'
    },
    buttons: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 15,
    },
    Profile: {
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: colors.ProfileBtns
    },
    editProfileTxt: {
        color: colors.fontColor,
        fontWeight: '600'
    },
    inviteBtn: {
        padding: 10,
        backgroundColor: colors.ProfileBtns,
        borderRadius: 8,
    },
    invite: {
        height: 20,
        width: 20
    },
    highlightsScroll: {
        marginTop: 15,
    },
    highlightItem: {
        alignItems: 'center',
        marginRight: 20
    },
    highlightImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.borderColor
    },
    highlightTitle: {
        marginTop: 4,
        fontSize: 12,
        color: colors.fontColor
    },
    addHighlightCircle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addHighlightPlus: {
        fontSize: 28,
        color: colors.fontColor,
        fontWeight: '400'
    }
})