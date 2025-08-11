// data/notificationsData.js

export const notificationsData = [
  // -------------------- FOLLOW REQUESTS --------------------
  {
    id: 'req-1',
    type: 'follow_request',
    username: 'private_user123',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: 'Follow requests — Approve or ignore requests',
    time: 'now',
    section: 'follow_requests',
  },
  

  // -------------------- TODAY --------------------
  {
    id: 'noti-1',
    type: 'like',
    username: 'adventure_guy',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    postImage: 'https://picsum.photos/id/1015/300/300',
    message: 'liked your photo',
    time: '2m',
    section: 'today',
  },
  {
    id: 'noti-2',
    type: 'comment',
    username: 'travel_girl',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    postImage: 'https://picsum.photos/id/1025/300/300',
    message: 'commented: "Love this!"',
    time: '10m',
    section: 'today',
  },
  {
    id: 'noti-3',
    type: 'follow',
    username: 'chef_boy',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    message: 'started following you',
    time: '30m',
    section: 'today',
  },

  // -------------------- YESTERDAY --------------------
  {
    id: 'noti-4',
    type: 'mention',
    username: 'musiclover',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    postImage: 'https://picsum.photos/id/1035/300/300',
    message: 'mentioned you in a comment',
    time: '1d',
    section: 'yesterday',
  },
  {
    id: 'noti-5',
    type: 'story_reaction',
    username: 'photofan',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    message: '❤️ your story',
    time: '1d',
    section: 'yesterday',
  },

  // -------------------- LAST 7 DAYS --------------------
  {
    id: 'noti-6',
    type: 'tag',
    username: 'fashionista',
    profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
    postImage: 'https://picsum.photos/id/1045/300/300',
    message: 'tagged you in a post',
    time: '3d',
    section: 'last_7_days',
  },
  {
    id: 'noti-7',
    type: 'like',
    username: 'nature_guy',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    postImage: 'https://picsum.photos/id/1055/300/300',
    message: 'liked your photo',
    time: '5d',
    section: 'last_7_days',
  },

  // -------------------- LAST 30 DAYS --------------------
  {
    id: 'noti-8',
    type: 'comment',
    username: 'city_explorer',
    profileImage: 'https://randomuser.me/api/portraits/women/9.jpg',
    postImage: 'https://picsum.photos/id/1065/300/300',
    message: 'commented: "Amazing shot!"',
    time: '2w',
    section: 'last_30_days',
  },
  {
    id: 'noti-9',
    type: 'follow',
    username: 'tech_guru',
    profileImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    message: 'started following you',
    time: '3w',
    section: 'last_30_days',
  },

  // -------------------- SUGGESTIONS --------------------
  {
    id: 'sug-1',
    type: 'suggestion',
    username: 'fitness_freak',
    profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
    message: 'Suggested for you',
    time: '',
    section: 'suggestions',
  },
  {
    id: 'sug-2',
    type: 'suggestion',
    username: 'gamer_pro',
    profileImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    message: 'Suggested for you',
    time: '',
    section: 'suggestions',
  },
];
