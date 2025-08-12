import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons';
import colors from './../../constants/colors';
import user from '../../data/userData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const ProfileHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.leftIconContainer}>
                <Octicons name='lock' size={15} color={colors.postIconColor} />
                <Text style={styles.text}>{user.username}</Text>
                <MaterialIcons
                    name="keyboard-arrow-down"
                    size={25}
                    color={colors.postIconColor}
                />
            </TouchableOpacity>


            <View style={styles.rightIconContainer}>
                <TouchableOpacity activeOpacity={1}>
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/threads.png')} style={styles.iconThread} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}>
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/add.png')} style={styles.iconThread} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}>
                    <Feather name='menu' size={27} color={colors.postIconColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ProfileHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: colors.bgColor,
        paddingTop: 15,
        paddingBottom: 10
    },
    leftIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: 20,
        color: colors.fontColor,
        marginLeft: 10,
    },
    rightIconContainer: {
        flexDirection: 'row',
        gap: 25,
        alignItems: 'center',
    },
    iconThread: {
        height: 22,
        width: 22,
    }
})