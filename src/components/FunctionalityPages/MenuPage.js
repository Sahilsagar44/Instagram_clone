import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import  Octicons  from 'react-native-vector-icons/Octicons';

const MenuPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>

                <TouchableOpacity style={[styles.IconsBackGround]}>
                    <MaterialIcons name='bookmark-outline' size={30} color={colors.postIconColor} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.IconsBackGround]}>
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/scanner.png')}
                        style={styles.statusIcon} />
                </TouchableOpacity>

            </View>
            <View style={styles.btnContainer}>

                <TouchableOpacity style={styles.btns}>
                    <View style={styles.itemContainer}>
                        <Ionicons name='star-outline' size={25} color={colors.postIconColor} />
                        <Text style={styles.btnTxt}>Add to Favorites</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <View style={styles.itemContainer}>
                        <Ionicons name='person-remove-outline' size={25} color={colors.postIconColor} />
                        <Text style={styles.btnTxt}>Unfollow</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <View style={styles.itemContainer}>
                        <Ionicons name='information-circle-outline' size={25} color={colors.postIconColor} />
                        <Text style={styles.btnTxt}>Why you're seeing this post</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <View style={styles.itemContainer}>
                        <Ionicons name='eye-off-outline' size={25} color={colors.postIconColor} />
                        <Text style={styles.btnTxt}>hide</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <View style={styles.itemContainer}>
                        <Ionicons name='person-circle-outline' size={25} color={colors.postIconColor} />
                        <Text style={styles.btnTxt}>About this account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <View style={styles.itemContainer}>
                        <Octicons name='report' size={25} color={colors.reportBtn} />
                        <Text style={styles.reportTxt}>report</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default MenuPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.commentsbgColor,
        marginBottom:15,
    },
    iconContainer: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginHorizontal: 60,
        marginVertical: 15,
    },
    IconsBackGround: {
        borderRadius: 35,
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    btnContainer: {
        justifyContent: 'center',
        gap: 1.5
    },
    itemContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15,
        paddingHorizontal: 15
    },
    btns: {
        borderTopWidth: 0.5,
        borderColor: colors.borderTopColor,
        paddingVertical: 16,
    },
    btnTxt: {
        color: colors.fontColor,
        fontSize: 16
    },
    reportTxt: {
        color: colors.reportBtn,
        fontSize: 16
    }
})