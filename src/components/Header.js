import {  Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/images/insta.png')}
                style={styles.image} />
            <View style={styles.rightWrapper}>
                <TouchableOpacity style={styles.iconWrapper} onPress={()=>navigation.navigate('NewPostScreen')}>
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/add.png')}
                        style={styles.addImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper} onPress={()=>navigation.navigate('MessageScreen')}>
                    <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/messenger.png')}
                        style={styles.addImage} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: colors.bgColor,
    },
    image: {
        width: 110,
        height: 30,
        resizeMode: 'contain',
    },
    iconWrapper: {
        marginRight: 20,
    },
    addImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    }, rightWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})