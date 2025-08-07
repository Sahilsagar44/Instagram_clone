const userData = {
  stories: [
    {
      id: 'story_1',
      userName: 'travel_enthusiast',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      hasStory: true,
    },
    {
      id: 'story_2',
      userName: 'food_lover',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      hasStory: true,
    },
    {
      id: 'story_3',
      userName: 'fitness_guru',
      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      hasStory: true,
    },
    {
      id: 'story_4',
      userName: 'tech_geek',
      profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
      hasStory: false,
    },
    {
      id: 'story_5',
      userName: 'nature_photographer',
      profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
      hasStory: true,
    },
  ],

  posts: [
    {
      id: 'post_1',
      user: {
        name: 'travel_enthusiast',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      postImage: 'https://picsum.photos/id/10/800/800',
      isLiked: false,
      isSaved: false,
      description: 'Beautiful sunset views from my recent trip to Bali! 🌅 #travel #bali #sunset',
      likesCount: 243,
      commentsCount: 32,
      timestamp: '2 hours ago',
    },
    {
      id: 'post_2',
      user: {
        name: 'food_lover',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      postImage: 'https://picsum.photos/id/312/800/800',
      isLiked: true,
      isSaved: true,
      description: 'Homemade pasta for dinner tonight! 🍝 #foodie #homecooking',
      likesCount: 187,
      commentsCount: 15,
      timestamp: '5 hours ago',
    },
    {
      id: 'post_3',
      user: {
        name: 'fitness_guru',
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      postImage: 'https://picsum.photos/id/27/800/800',
      isLiked: false,
      isSaved: false,
      description: 'Morning workout complete! 💪 #fitness #workout #gains',
      likesCount: 312,
      commentsCount: 28,
      timestamp: '1 day ago',
    },
    {
      id: 'post_4',
      user: {
        name: 'tech_geek',
        profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
      },
      postImage: 'https://picsum.photos/id/180/800/800',
      isLiked: false,
      isSaved: true,
      description: 'My new coding setup! #developer #workspace',
      likesCount: 156,
      commentsCount: 22,
      timestamp: '3 days ago',
    },
    {
      id: 'post_5',
      user: {
        name: 'nature_photographer',
        profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
      },
      postImage: 'https://picsum.photos/id/28/800/800',
      isLiked: true,
      isSaved: false,
      description: 'Forest hike this weekend 🌲 #nature #photography',
      likesCount: 421,
      commentsCount: 45,
      timestamp: '1 week ago',
    },
  ],
};

export default userData;
