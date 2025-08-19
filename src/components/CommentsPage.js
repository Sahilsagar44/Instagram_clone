import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import usersPosts from '../data/postsData';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentsPage = ({ postId }) => {
    const post = usersPosts.find(p => p.id === postId) || usersPosts[0];
    const comments = post.comments;

    const [likedComments, setLikedComments] = useState({});

    const [likedCommentsCounts, setLikedCommentsCounts] = useState(comments.reduce((acc, item) => {
        acc[item.id] = item.likesCount || 0
        return acc
    }, {}));

    const toggleLike = (id) => {
        setLikedComments((prev) => {
            const isLiked = !prev[id];
            setLikedCommentsCounts((prevCounts) => ({
                ...prevCounts,
                [id]: isLiked ? prevCounts[id] + 1 : prevCounts[id] - 1,
            }));
            return { ...prev, [id]: isLiked };
        });
    };



    const renderItem = useCallback(({ item }) => {
        const liked = likedComments[item.id] || false;
        const commentCount = likedCommentsCounts[item.id] || 0;

        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.user.profileImage }} style={styles.profileImage} />
                <View style={styles.commentContent}>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <Text style={styles.username}>{item.user.name}</Text>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.commentText}>{item.text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.replytxt}>reply</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => toggleLike(item.id)} style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={liked ? 'heart' : 'heart-outline'}
                        size={26}
                        color={liked ? colors.likeColor : colors.postIconColor}
                    />
                    <Text style={styles.timestamp}>{commentCount}</Text>
                </TouchableOpacity>
            </View>
        );
    }, [likedComments, likedCommentsCounts]);

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

export default CommentsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.commentsbgColor,
    },
    contentContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: 'flex-start',
        paddingVertical: 15,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 35,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.fontColor,
    },
    commentText: {
        fontSize: 14,
        color: colors.fontColor,
        marginTop: 2,
    },
    timestamp: {
        fontSize: 12,
        color: colors.subFontColor,
        marginTop: 2,
    },
    replytxt: {
        fontSize: 14,
        color: colors.subFontColor,
        marginTop: 2,
    }
});
