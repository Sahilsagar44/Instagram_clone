import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
import colors from './../../../constants/colors';
import user from './../../../data/userData';
import  Feather  from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const MentionDetails = () => {
    const [likesCount,setLikesCount] = useState()
    
    const [playingVideoId, setPlayingVideoId] = useState(null); 
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleReel = viewableItems.find(item => item.item.type === 'reel');
      if (visibleReel) {
        setPlayingVideoId(visibleReel.item.id);
      } else {
        setPlayingVideoId(null);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: '70', 
  }).current;

  const renderMentionItem = ({ item }) => {
    return (
      <View style={styles.card}>
        
        <View style={styles.headerRow}>
          <Image source={{ uri: item.profileImage }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.username}>{item.userName}</Text>
            <Text style={styles.followStatus}>
              {item.isFollowing ? 'Following' : 'Follow'}
            </Text>
          </View>
          <TouchableOpacity>
            <Feather name="more-vertical" size={20} color={colors.fontColor} />
          </TouchableOpacity>
        </View>

        
        {item.type === 'reel' ? (
          <Video
            source={{ uri: item.uri }}
            style={styles.media}
            resizeMode="cover"
            paused={playingVideoId !== item.id}
            repeat
            poster={item.thumbnail}
          />
        ) : (
          <Image source={{ uri: item.uri }} style={styles.media} />
        )}

        
        <View style={styles.actionsRow}>
          <View style={styles.actionsLeft}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons
                name={item.isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color={item.isLiked ? 'red' : colors.fontColor}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="chatbubble-outline" size={24} color={colors.fontColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="paper-plane-outline" size={24} color={colors.fontColor} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color={colors.fontColor} />
          </TouchableOpacity>
        </View>

        
        <Text style={styles.likes}>{item.likes} likes</Text>

        
        <Text style={styles.description}>
          <Text style={styles.username}>{item.userName} </Text>
          {item.description}
        </Text>

        
        <Text style={styles.time}>{new Date(item.timestamp).toDateString()}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={user.mentions}
      keyExtractor={(item) => item.id}
      renderItem={renderMentionItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      backgroundColor={colors.bgColor}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default MentionDetails;

const styles = StyleSheet.create({
  card: {
    // paddingBottom: 20,
    gap:5,
    backgroundColor: colors.bgColor
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    color: colors.fontColor,
  },
  followStatus: {
    fontSize: 12,
    color: 'gray',
  },
  media: {
    width: width,
    height: width,
    backgroundColor: colors.bgColor,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  actionsLeft: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginRight: 12,
  },
  likes: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: colors.fontColor,
  },
  description: {
    marginHorizontal: 10,
    color: colors.fontColor,
  },
  time: {
    marginHorizontal: 10,
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
  },
});
