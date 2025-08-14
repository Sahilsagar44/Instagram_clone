// Dummy usersData for Instagram clone
// Includes additional fields for StoryScreen compatibility

export const OtherUsersData = [
  {
    id: 'u1',
    username: 'travel_enthusiast',
    fullName: 'Aarav Mehta',
    bio: '☀️ Travelling the world • Coffee + Mountains • Photos & stories',
    profileImage: 'https://picsum.photos/seed/u1/200/200',
    isVerified: false,
    isPrivate: false,
    followers: 12540,
    following: 380,
    postsCount: 24,
    createdAt: '2022-03-12T08:30:00.000Z',
    stories: [
      { 
        id: 's1', 
        image: 'https://picsum.photos/seed/s1/400/700', 
        createdAt: '2025-08-01T05:00:00.000Z', 
        isExpired: false,
        title: 'travel_enthusiast', // for StoryScreen
        time: '5h ago',            // could be formatted dynamically, but here as dummy text
        musicName: 'Lost in the Wild - ArtistName'
      },
    ],
    posts: [
      { id: 'p1', image: 'https://picsum.photos/seed/p1/800/800', caption: 'Sunrise at the broken cliffs', likes: 2300, comments: 34, createdAt: '2025-07-20T09:00:00.000Z' },
      { id: 'p2', image: 'https://picsum.photos/seed/p2/800/800', caption: 'Street food nights', likes: 980, comments: 12, createdAt: '2025-06-11T18:20:00.000Z' },
    ],
  },
  {
    id: 'u2',
    username: 'foodie_delights',
    fullName: 'Nisha Kapoor',
    bio: 'Recipes • Restaurant reviews • Home baker 🍰',
    profileImage: 'https://picsum.photos/seed/u2/200/200',
    isVerified: false,
    isPrivate: false,
    followers: 8420,
    following: 512,
    postsCount: 58,
    createdAt: '2021-11-02T12:00:00.000Z',
    stories: [
      {
        id: 's3', 
        image: 'https://picsum.photos/seed/s3/400/700', 
        createdAt: '2025-08-13T15:20:00.000Z', 
        isExpired: false,
        title: 'foodie_delights',
        time: '2h ago',
        musicName: 'Sweet Symphony - ArtistX'
      }
    ],
    posts: [
      { id: 'p3', image: 'https://picsum.photos/seed/p3/800/800', caption: 'Flaky butter croissants', likes: 5400, comments: 120, createdAt: '2025-04-02T07:45:00.000Z' },
    ],
  },
  {
    id: 'u3',
    username: 'city.sketcher',
    fullName: 'Rohan Iyer',
    bio: 'Illustrator • I draw the city one line at a time',
    profileImage: 'https://picsum.photos/seed/u3/200/200',
    isVerified: false,
    isPrivate: true,
    followers: 980,
    following: 210,
    postsCount: 12,
    createdAt: '2023-06-15T15:30:00.000Z',
    stories: [
      { 
        id: 's2', 
        image: 'https://picsum.photos/seed/s2/400/700', 
        createdAt: '2025-08-07T10:00:00.000Z', 
        isExpired: false,
        title: 'city.sketcher',
        time: '1d ago',
        musicName: 'Rainy Day Blues - Alan Keys'
      },
    ],
    posts: [
      { id: 'p4', image: 'https://picsum.photos/seed/p4/800/800', caption: 'Monsoon sketches', likes: 310, comments: 8, createdAt: '2025-07-01T11:00:00.000Z' },
    ],
  },
  // 📝 Keep other users same but you can also add stories with these keys if needed
];

export default OtherUsersData;
