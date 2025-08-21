const usersPosts = [
  {
    id: 'post_1',
    user: {
      name: 'travel_enthusiast',
      displayName: 'Travel Enthusiast',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    postImage: 'https://picsum.photos/id/10/800/800',
    isLiked: false,
    isSaved: false,
    description: 'Beautiful sunset views from my recent trip to Bali! 🌅 #travel #bali #sunset',
    likesCount: 243,
    commentsCount: 32,
    sendCount: 8,
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'nature_fan',
          profileImage: 'https://randomuser.me/api/portraits/men/51.jpg',
        },
        text: 'Wow, this view is amazing! 😍',
        timestamp: '1h ago',
      },
      {
        id: 'c2',
        user: {
          name: 'sunset_lover',
          profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        text: 'Bali sunsets never disappoint!',
        timestamp: '30m ago',
      },
    ],
  },
  {
    id: 'post_2',
    user: {
      name: 'food_lover',
      displayName: 'Food Lover',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    postImage: 'https://picsum.photos/id/312/800/800',
    isLiked: true,
    isSaved: true,
    description: 'Homemade pasta for dinner tonight! 🍝 #foodie #homecooking',
    likesCount: 187,
    commentsCount: 15,
    sendCount: 30,
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'chef_girl',
          profileImage: 'https://randomuser.me/api/portraits/women/14.jpg',
        },
        text: 'This looks so delicious! 🤤',
        timestamp: '3h ago',
      },
      {
        id: 'c2',
        user: {
          name: 'foodie123',
          profileImage: 'https://randomuser.me/api/portraits/men/24.jpg',
        },
        text: 'Recipe please!! 🙏',
        timestamp: '1h ago',
      },
    ],
  },
  {
    id: 'post_3',
    user: {
      name: 'fitness_guru',
      displayName: 'Fitness Guru',

      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    postImage: 'https://picsum.photos/id/27/800/800',
    isLiked: false,
    isSaved: false,
    description: 'Morning workout complete! 💪 #fitness #workout #gains',
    likesCount: 312,
    commentsCount: 28,
    sendCount: 45,
    timestamp: '1 day ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'gym_rat',
          profileImage: 'https://randomuser.me/api/portraits/men/44.jpg',
        },
        text: 'Respect! 💯',
        timestamp: '20h ago',
      },
      {
        id: 'c2',
        user: {
          name: 'fit_girl',
          profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
        },
        text: 'You motivate me so much 🔥',
        timestamp: '10h ago',
      },
    ],
  },
  {
    id: 'post_4',
    user: {
      name: 'tech_geek',
      displayName: 'Tech Geek',

      profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    postImage: 'https://picsum.photos/id/180/800/800',
    isLiked: false,
    isSaved: true,
    description: 'My new coding setup! #developer #workspace',
    likesCount: 156,
    commentsCount: 22,
    sendCount: 2,
    timestamp: '3 days ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'coder_boy',
          profileImage: 'https://randomuser.me/api/portraits/men/19.jpg',
        },
        text: 'Bro this setup is clean 🔥',
        timestamp: '2d ago',
      },
      {
        id: 'c2',
        user: {
          name: 'uiux_girl',
          profileImage: 'https://randomuser.me/api/portraits/women/26.jpg',
        },
        text: 'Loving the minimal vibes ✨',
        timestamp: '1d ago',
      },
    ],
  },
  {
    id: 'post_5',
    user: {
      name: 'nature_photographer',
      displayName: 'Nature Photographer',

      profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
    },
    postImage: 'https://picsum.photos/id/28/800/800',
    isLiked: true,
    isSaved: false,
    description: 'Forest hike this weekend 🌲 #nature #photography',
    likesCount: 421,
    commentsCount: 45,
    sendCount: 10,
    timestamp: '1 week ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'adventure_man',
          profileImage: 'https://randomuser.me/api/portraits/men/13.jpg',
        },
        text: 'Nature is the best healer ❤️',
        timestamp: '5d ago',
      },
      {
        id: 'c2',
        user: {
          name: 'wildlife_fan',
          profileImage: 'https://randomuser.me/api/portraits/women/60.jpg',
        },
        text: 'Such a peaceful place 🌿',
        timestamp: '2d ago',
      },
    ],
  },
  // ---------- New 5 Posts ----------
  {
    id: 'post_6',
    user: {
      name: 'bookworm',
      displayName: 'Book Worm',
      profileImage: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    postImage: 'https://picsum.photos/id/1005/800/800',
    isLiked: false,
    isSaved: false,
    description: 'Weekend reading session 📚 #books #relax',
    likesCount: 98,
    commentsCount: 12,
    sendCount: 3,
    timestamp: '2 weeks ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'literature_fan',
          profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
        },
        text: 'Which book is this?',
        timestamp: '1w ago',
      },
    ],
  },
  {
    id: 'post_7',
    user: {
      name: 'pet_lover',
      displayName: 'Pet Lover',
      profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    postImage: 'https://picsum.photos/id/237/800/800',
    isLiked: true,
    isSaved: true,
    description: 'My little buddy 🐶 #dog #cute',
    likesCount: 512,
    commentsCount: 60,
    sendCount: 25,
    timestamp: '3 weeks ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'animal_fan',
          profileImage: 'https://randomuser.me/api/portraits/men/34.jpg',
        },
        text: 'So adorable! 🥺',
        timestamp: '2w ago',
      },
    ],
  },
  {
    id: 'post_8',
    user: {
      name: 'traveler_guy',
      displayName: 'Traveler Guy',
      profileImage: 'https://randomuser.me/api/portraits/men/89.jpg',
    },
    postImage: 'https://picsum.photos/id/1041/800/800',
    isLiked: false,
    isSaved: false,
    description: 'Snowy mountains adventure 🏔️❄️ #travel #mountains',
    likesCount: 302,
    commentsCount: 34,
    sendCount: 14,
    timestamp: '1 month ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'snow_lover',
          profileImage: 'https://randomuser.me/api/portraits/women/21.jpg',
        },
        text: 'This is breathtaking!',
        timestamp: '3w ago',
      },
    ],
  },
  {
    id: 'post_9',
    user: {
      name: 'artist_soul',
      displayName: 'Artist Soul',
      profileImage: 'https://randomuser.me/api/portraits/women/77.jpg',
    },
    postImage: 'https://picsum.photos/id/1080/800/800',
    isLiked: true,
    isSaved: false,
    description: 'Abstract art I painted today 🎨 #art #creative',
    likesCount: 210,
    commentsCount: 18,
    sendCount: 7,
    timestamp: '2 months ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'art_lover',
          profileImage: 'https://randomuser.me/api/portraits/men/14.jpg',
        },
        text: 'Love the colors! 😍',
        timestamp: '1mo ago',
      },
    ],
  },
  {
    id: 'post_10',
    user: {
      name: 'car_enthusiast',
      displayName: 'Car Enthusiast',
      profileImage: 'https://randomuser.me/api/portraits/men/47.jpg',
    },
    postImage: 'https://picsum.photos/id/1074/800/800',
    isLiked: false,
    isSaved: true,
    description: 'Dream car spotted 🏎️🔥 #cars #luxury',
    likesCount: 640,
    commentsCount: 55,
    sendCount: 40,
    timestamp: '3 months ago',
    comments: [
      {
        id: 'c1',
        user: {
          name: 'racer_boy',
          profileImage: 'https://randomuser.me/api/portraits/men/29.jpg',
        },
        text: 'That’s my dream too! 😍',
        timestamp: '2mo ago',
      },
    ],
  },
];

export default usersPosts;
