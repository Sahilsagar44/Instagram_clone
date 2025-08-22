import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import CommentsPage from './FunctionalityPages/CommentsPage';
import SendPage from './FunctionalityPages/SendPage';
import MenuPage from './FunctionalityPages/MenuPage';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('window')


const Feeds = ({ post, index }) => {
  const navigation = useNavigation()
  const [selectedPostId, setSelectedPostId] = useState(null);

  if (!post) {
    return null;
  }

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount || 0);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [sendCount, setSendCount] = useState(post.sendCount || 0);


  const scaleAnimation = useRef(new Animated.Value(0)).current
  const opacityAnimation = useRef(new Animated.Value(0)).current

  const refRBSheetComment = useRef()
  const refRBSheetSend = useRef()
  const refRBSheetMenu = useRef()

  const triggerHeartAnimation = () => {
    scaleAnimation.setValue(0.5)
    opacityAnimation.setValue(1)

    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    })
  }

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      setIsLiked((prevIsLiked) => {
        if (prevIsLiked) {
          setLikesCount((count) => Math.max(0, count - 1));
          return false;
        } else {
          setLikesCount((count) => count + 1);
          triggerHeartAnimation();
          return true;
        }
      });
    });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}
          onPress={() =>
            navigation.navigate('UserProfileScreen', {
               userId: post.userId,
            })
          }
        >
          <Image
            source={{ uri: post.user.profileImage }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
          <Text style={{ color: colors.fontColor, fontSize: 16, fontWeight: 'bold' }}>
            {post.user.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => refRBSheetMenu.current.open()}>
          <Image source={require('D:/sahil/react_native/Instagram_clone/src/assets/icons/dots.png')}
            style={{
              width: 25,
              height: 25,
            }} />
        </TouchableOpacity>
      </View>
      <GestureDetector gesture={doubleTap}>
        <View style={styles.postImageContainer}>
          <Image
            source={{ uri: post.postImage }}
            resizeMode="cover"
            style={styles.postImage}
          />
          <Animated.View
            style={[
              styles.animatedHeart,
              {
                transform: [{
                  scale: scaleAnimation
                }],
                opacity: opacityAnimation
              }
            ]}
          >
            <MaterialIcons name="favorite" size={100} color="white" />
          </Animated.View>
        </View>

      </GestureDetector>

      <View style={styles.putterContainer}>
        <TouchableOpacity
          onPress={() => {
            const newLikeState = !isLiked;
            setIsLiked(newLikeState);
            setLikesCount((count) => count + (newLikeState ? 1 : -1));
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialIcons
              name={isLiked ? 'favorite' : 'favorite-border'}
              size={29}
              color={isLiked ? colors.likeColor : colors.postIconColor}
            />
            <Text style={styles.font}>{likesCount}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedPostId(post.id);  
            refRBSheetComment.current.open();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <FontAwesome name="comment-o" size={25} color={colors.postIconColor} />
            <Text style={styles.font}>{commentsCount}</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => refRBSheetSend.current.open()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Feather name="send" size={25} color={colors.postIconColor} />
            <Text style={styles.font}>{sendCount}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
            <MaterialIcons
              name={isSaved ? 'bookmark' : 'bookmark-border'}
              size={29}
              color={colors.postIconColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={{ color: colors.fontColor, fontWeight: 'bold' }}>{post.user.name}</Text>
        <Text style={{ color: colors.subFontColor }}>{post.description}</Text>
      </View>
      <RBSheet
        ref={refRBSheetComment}
        height={screenHeight}
        draggable={true}
        dragOnContent={true}
        closeDuration={400}
        openDuration={400}
        customStyles={{
          draggableIcon: {
            backgroundColor: colors.fontColor,
            width: 45,
            height: 1.5,
            marginTop: 20
          },
          container: {
            backgroundColor: colors.commentsbgColor
          }
        }}>
        {selectedPostId && <CommentsPage postId={selectedPostId} />}
      </RBSheet>
      <RBSheet
        ref={refRBSheetSend}
        height={screenHeight * 0.7}
        draggable={true}
        dragOnContent={true}
        closeDuration={400}
        openDuration={400}
        customStyles={{
          draggableIcon: {
            backgroundColor: colors.fontColor,
            width: 45,
            height: 1.5,
            borderRadius: 14,
            marginTop: 15,
          },
          container: {
            backgroundColor: colors.commentsbgColor,
          },
        }}>
        <SendPage />
      </RBSheet>
      <RBSheet
        ref={refRBSheetMenu}
        height={screenHeight * 0.6}
        draggable={true}
        dragOnContent={true}
        closeDuration={400}
        openDuration={400}
        customStyles={{
          draggableIcon: {
            backgroundColor: colors.fontColor,
            width: 50,
            marginTop: 20
          },
          container: {
            backgroundColor: colors.commentsbgColor,
          },
        }}>
        <MenuPage />
      </RBSheet>
    </View>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    height: '10%',
    width: '100%',
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
  animatedHeart: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
