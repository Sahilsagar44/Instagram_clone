const user = {
  id: 'me',
  name: 'sahil_dev',
  fullName: 'Sahil Dev',
  bio: 'React Native Developer 💻 | Dreaming in code.',
  profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
  followers: 870,
  following: 120,
  posts: [
    {
      id: 'my_post_1',
      postImage: 'https://picsum.photos/id/111/800/800',
      description: 'Working on my new app! 🚀',
      likesCount: 104,
      commentsCount: 12,
      sendCount: 3,
      timestamp: '1 day ago',
    },
    {
      id: 'my_post_2',
      postImage: 'https://picsum.photos/id/112/800/800',
      description: 'Code & chai ☕',
      likesCount: 88,
      commentsCount: 5,
      sendCount: 2,
      timestamp: '2 days ago',
    },
  ],
  hasStory: false,
  story: {
    image: 'https://picsum.photos/id/101/800/800',
    timestamp: '3 hours ago',
  },
};

export default user;
