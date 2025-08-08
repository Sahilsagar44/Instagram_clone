import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import { reelsData } from '../data/ReelsData';
import colors from '../constants/colors';

const { height, width } = Dimensions.get('window');

const Reel = ({ route }) => {
    const reelId = route?.params?.reelId || 'reel-1';
    const reel = reelsData.find(item => item.id === reelId) || reelsData[0];

    return (
        <View style={styles.container}>
            {/* Video */}
            <Text>ReelsScreen</Text>
            <Video
                style={styles.video}
                source={{ uri: reel.video }}
                resizeMode="cover"
                repeat
                paused={false}
            // controls={false} 
            // controls
            // controlsStyles={true}
            />

            {/* Overlay Content */}
            <View style={styles.overlay}>
                <Text style={styles.username}>@{reel.user.username}</Text>
                <Text style={styles.caption}>{reel.caption}</Text>
                <Text style={styles.music}>{reel.music}</Text>
            </View>
        </View>
    );
};

export default Reel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },
    overlay: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    caption: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },
    music: {
        color: '#ccc',
        fontSize: 12,
    },
});
