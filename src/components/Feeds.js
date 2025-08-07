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
    const [isCommented, setIsCommented] = useState(false);

    const [likesCount, setLikesCount] = useState(post.likesCount || 0)
    const [commentsCount, setCommentsCount] = useState(post.commentsCount || 0);
    const [sendCount, setSendCount] = useState(post.sendCount || 0)


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

                <TouchableOpacity onPress={() => setIsLiked(prev => {
                    const newLikeState = !prev
                    setLikesCount(count => count + (newLikeState ? 1 : -1))
                    return newLikeState
                })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <MaterialIcons
                            name={isLiked ? "favorite" : "favorite-border"}
                            size={29}
                            color={isLiked ? colors.likeColor : colors.postIconColor}
                        />
                        <Text style={styles.font}>{likesCount}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCommentsCount(prev => prev + 1)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <FontAwesome name='comment-o' size={25} color={colors.postIconColor} />
                        <Text style={styles.font}>
                            {commentsCount}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSendCount(prev => prev + 1)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Feather name='send' size={25} color={colors.postIconColor} />
                        <Text style={styles.font}>
                            {sendCount}
                        </Text>
                    </View>
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
            {/* <View style={styles.timestampContainer}>
                <Text style={styles.timestampText}>
                    {getTimeAgo(post.timestamp)}
                </Text>
            </View> */}
        </View>
    )
}


export default Feeds

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        width: '100%',
        // marginTop:40
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
        paddingVertical: 15,
        paddingHorizontal: 18,
        gap: 9,
        backgroundColor: colors.bgColor,
    },
    descriptionContainer: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        gap: 5,
        backgroundColor: colors.bgColor,
        marginBottom: '5%',
    },
    font: {
        color: colors.fontColor,
    },
    timestampContainer: {
        paddingHorizontal: 18,
        marginBottom: 10,
    },

    timestampText: {
        color: colors.subFontColor,
        fontSize: 12,
    }
})