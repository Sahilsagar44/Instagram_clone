import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';


const Feeds = ({ post }) => {
    if (!post) {
        return null; 
    }

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: post.user.profileImage }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    }}
                />
                <Text style={{ color: colors.fontColor, fontSize: 16, fontWeight: 'bold' }}>{post.user.name}</Text>
            </View>
            <View style={styles.postImageContainer}>
                <Image
                    source={{ uri: post.postImage }}
                    resizeMode='cover'
                    style={styles.postImage}
                />
            </View>
            <View style={styles.putterContainer}>
                <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                    <MaterialIcons name={isLiked ? "favorite" : "favorite-border"} size={29} color={isLiked ? colors.likeColor : colors.postIconColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <FontAwesome name='comment-o' size={25} color={colors.postIconColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Feather name='send' size={25} color={colors.postIconColor} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { setIsSaved(!isSaved) }} >
                    <MaterialIcons name={isSaved ? "bookmark" : "bookmark-border"} size={29} color={colors.postIconColor} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{ color: colors.fontColor, fontWeight: 'bold' }}>{post.user.name}</Text>
                <Text style={{ color: colors.subFontColor }}>{post.description}</Text>
            </View>
        </View>
    )
}


export default Feeds

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        width: '100%',
        marginTop:40
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        alignItems: 'center',
        backgroundColor: colors.bgColor,
        height: '10%',
        width: '100%',
        gap: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    postImageContainer: {
        width: '100%',
        height: 400,
        overflow: 'hidden',
    },
    postImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    putterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 18,
        gap: 9,
        backgroundColor: colors.bgColor,
    },
    descriptionContainer: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        gap: 5,
        backgroundColor: colors.bgColor,
        marginBottom: '10%',
    },
})