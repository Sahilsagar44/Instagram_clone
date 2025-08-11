import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import { reelsData } from '../data/ReelsData';
import colors from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const Reel = () => {
    const isFocused = useIsFocused()
    const [isLiked, setIsLiked] = useState(false);
    const [isFollow, setIsFollow] = useState(false)

    const [likesCount, setLikesCount] = useState(reelsData[0]?.likesCount || 0)
    const [commentsCount, setCommentsCount] = useState(reelsData[0]?.comments || 0);
    const [sendCount, setSendCount] = useState(reelsData[0]?.shares || 0)


    const [currentIndex, setCurrentIndex] = useState(0);
    const viewabilityConfig = { itemVisiblePercentThreshold: 80 }

    const onVieableItemsChange = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            setCurrentIndex(newIndex);
            setIsLiked(false);
            setIsFollow(false);
            setLikesCount(reelsData[newIndex]?.likes || 0);
            setCommentsCount(reelsData[newIndex]?.comments || 0);
            setSendCount(reelsData[newIndex]?.shares || 0);
        }
    })

    const renderItem = ({ item, index }) => {
        const isActive = index === currentIndex



        return (
            <View style={styles.reelContainer}>
                {/* Video */}

                <Video
                    style={styles.video}
                    source={{ uri: item.video }}
                    resizeMode="cover"
                    repeat
                    paused={!isActive || !isFocused}
                />


                <View style={styles.overlay}>
                    <View style={styles.leftContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                            <TouchableOpacity>
                                <Image source={{ uri: item.user.profileImage }}
                                    style={styles.profileImage} />
                            </TouchableOpacity>

                            <Text style={styles.username}>@{item.user.username}</Text>

                            <TouchableOpacity
                                style={[styles.followButton, isFollow
                                    ? styles.following
                                    : styles.follow]}
                                onPress={() => setIsFollow(prep => !prep)}>
                                <Text style={[styles.followButtonText, isFollow ? styles.followingText : styles.followText]}>{isFollow ? 'Following' : 'Follow'}</Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.caption}>{item.caption}</Text>
                        <Text style={styles.music}>{item.music}</Text>
                    </View>

                    <View style={styles.rightButtons}>

                        <TouchableOpacity onPress={() => setIsLiked(prev => {
                            const newLikeState = !prev
                            setLikesCount(count => count + (newLikeState ? 1 : -1))
                            return newLikeState
                        })}>
                            <View style={styles.iconText}>
                                <MaterialIcons
                                    name={isLiked ? "favorite" : "favorite-border"}
                                    size={29}
                                    color={isLiked ? colors.likeColor : colors.postIconColor}
                                />
                                <Text style={styles.count}>{likesCount}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setCommentsCount(prev => prev + 1)}>
                            <View style={styles.iconText}>
                                <FontAwesome name='comment-o' size={25} color={colors.postIconColor} />
                                <Text style={styles.count}>
                                    {commentsCount}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSendCount(prev => prev + 1)}>
                            <View style={styles.iconText}>
                                <Feather name='send' size={25} color={colors.postIconColor} />
                                <Text style={styles.count}>
                                    {sendCount}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.iconText}>
                                <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/dots.png')} style={{ width: 10, height: 25 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.iconText}>
                                <ImageBackground source={{ uri: item.user.profileImage }} blurRadius={3} style={styles.musicImage}>
                                    <FontAwesome name='music' size={20} color={colors.fontColor} style={{ position: 'absolute' }} />
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View>
             <View style={styles.header}>
                <TouchableOpacity activeOpacity={1} style={{flexDirection:'row',alignItems:'center'}}>
                     <Text style={{ color: colors.fontColor, fontSize: 20, fontWeight: 'bold', marginRight: 5 }}>Reels</Text>
                     <MaterialIcons name='keyboard-arrow-down' size={30} color='white'/>
                 </TouchableOpacity>
             </View>
            <FlatList
                data={reelsData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onVieableItemsChange.current}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    )
};

export default Reel;

const styles = StyleSheet.create({
    reelContainer: {
        width: width,
        height: height,
        backgroundColor: 'black',
    },
    video: {
        position: 'absolute',
        width: width,
        height: height,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        zIndex: 10,
        backgroundColor: colors.bgColor,
    },
    overlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 60,      
    },
    followButton: {
        marginLeft: 10,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    follow: {
        backgroundColor: 'transparent',
        borderColor: colors.followBorder,
    },
    following: {
        borderColor: colors.followBorder,
    },
    followButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
    followText: {
        color: colors.fontColor,
    },
    followingText: {
        color: colors.fontColor,
    },
    leftContent: {
        position: 'absolute',
        bottom: 75,
        left: 15,
        maxWidth: width * 0.65,
        justifyContent: 'flex-end'
    },
    username: {
        color: colors.fontColor,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
    },
    caption: {
        color: colors.fontColor,
        fontSize: 14,
        marginBottom: 5,
        lineHeight: 18,
    },
    music: {
        color: colors.musicBar,
        fontSize: 12,
        marginTop: 4,
    },
    musicImage: {
        width: 30,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        resizeMode: 'contain',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',

    },
    rightButtons: {
        position: 'absolute',
        bottom: 80,
        right: 12,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 35,
        marginBottom: 6,
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    iconText: {
        alignItems: 'center',
        marginTop: 25,
    },
    count: {
        color: colors.fontColor,
        fontSize: 13,
        marginTop: 4,
        fontWeight: '500',
    },
});
