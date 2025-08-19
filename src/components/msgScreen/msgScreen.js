import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from './../../constants/colors';
import messageData from './../../data/messageData';
import Octicons from 'react-native-vector-icons/Octicons';

const MsgScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { chatId } = route.params;
    const chat = messageData.find(c => c.id === chatId);

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.sentByMe ? styles.myMessage : styles.theirMessage
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>{item.timestamp}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={26} color={colors.postIconColor} />
                    </TouchableOpacity>
                    <Image source={{ uri: chat.user.profileImage }} style={styles.headerImage} />
                    <TouchableOpacity style={styles.headerCenter} activeOpacity={0.8}>
                        <Text style={styles.headertxt}>{chat.user.name}</Text>
                        <Text style={styles.subHeadertxt}>@{chat.user.username}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Ionicons name='call-outline' size={26} color={colors.postIconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/video.png')}
                            style={styles.newMessage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={chat?.messages || []}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.chatContainer}
                showsVerticalScrollIndicator={false}
                inverted />

            <View style={styles.inputContainer}>
                <TouchableOpacity style={{ backgroundColor: colors.changeProfileTxt, borderRadius: 50, width: 40, height: 40, justifyContent: 'center' }}>
                    <Ionicons name="camera" size={30} color={colors.postIconColor} style={styles.icon} />
                </TouchableOpacity>

                <TextInput
                    placeholder="Message..."
                    placeholderTextColor="#999"
                    style={styles.input}
                />

                <TouchableOpacity>
                    <Ionicons
                        name="mic-outline"
                        size={24}
                        color={colors.postIconColor}
                        style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons
                        name="image-outline"
                        size={24}
                        color={colors.postIconColor}
                        style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons
                        name="happy-outline"
                        size={24}
                        color={colors.postIconColor}
                        style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Octicons
                        name="plus-circle"
                        size={24}
                        color={colors.postIconColor}
                        style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MsgScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor
    },
    header: {
        paddingHorizontal: 12,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bgColor,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderTopColor || '#222'
    },
    headerImage: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginLeft: 20,
    },
    headerCenter: {
        marginLeft: 12,
    },
    headertxt: {
        color: colors.fontColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeadertxt: {
        color: colors.subFontColor,
        fontSize: 13,
        marginTop: -2,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
    },
    newMessage: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
    },

    chatContainer: {
        padding: 12,
    },
    messageBubble: {
        maxWidth: "75%",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 18,
        marginVertical: 4,
    },
    myMessage: {
        backgroundColor: colors.myMsgBackground,
        alignSelf: "flex-end",
    },
    theirMessage: {
        backgroundColor: colors.theirMsgBackground,
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 15,
        color: colors.fontColor,
    },
    timeText: {
        fontSize: 11,
        color: colors.subFontColor,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.TextInput.backgroundColor,
        paddingVertical: 15,
        borderRadius: 35,
        paddingHorizontal: 20,
        marginHorizontal: 20
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        color: colors.fontColor,
        fontSize: 14,
        marginHorizontal: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
});
