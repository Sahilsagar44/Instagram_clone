// Dummy usersData for Instagram clone
// Each user includes profile info, stats, posts, and stories sample data

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
      { id: 's1', image: 'https://picsum.photos/seed/s1/400/700', createdAt: '2025-08-01T05:00:00.000Z', isExpired: false },
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
    stories: [],
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
      { id: 's2', image: 'https://picsum.photos/seed/s2/400/700', createdAt: '2025-08-07T10:00:00.000Z', isExpired: false },
    ],
    posts: [
      { id: 'p4', image: 'https://picsum.photos/seed/p4/800/800', caption: 'Monsoon sketches', likes: 310, comments: 8, createdAt: '2025-07-01T11:00:00.000Z' },
    ],
  },

  {
    id: 'u4',
    username: 'fitness_with_asha',
    fullName: 'Asha R.',
    bio: 'Personal trainer • HIIT • Yoga • Small wins each day',
    profileImage: 'https://picsum.photos/seed/u4/200/200',
    isVerified: true,
    isPrivate: false,
    followers: 45200,
    following: 180,
    postsCount: 320,
    createdAt: '2019-01-10T08:00:00.000Z',
    stories: [],
    posts: [
      { id: 'p5', image: 'https://picsum.photos/seed/p5/800/800', caption: 'Morning mobility flow', likes: 15200, comments: 540, createdAt: '2025-05-15T06:30:00.000Z' },
    ],
  },

  {
    id: 'u5',
    username: 'tech.minds',
    fullName: 'Tech Minds',
    bio: 'Latest dev tips, short tutorials, and tiny projects',
    profileImage: 'https://picsum.photos/seed/u5/200/200',
    isVerified: false,
    isPrivate: false,
    followers: 18900,
    following: 60,
    postsCount: 142,
    createdAt: '2020-09-25T09:15:00.000Z',
    stories: [],
    posts: [
      { id: 'p6', image: 'https://picsum.photos/seed/p6/800/800', caption: 'Build this widget in 5 minutes', likes: 8200, comments: 310, createdAt: '2025-03-22T14:00:00.000Z' },
    ],
  },

  {
    id: 'u6',
    username: 'minimal.home',
    fullName: 'Sana Verma',
    bio: 'Minimal interiors • Plants • Cozy corners',
    profileImage: 'https://picsum.photos/seed/u6/200/200',
    isVerified: false,
    isPrivate: false,
    followers: 7200,
    following: 980,
    postsCount: 87,
    createdAt: '2024-02-18T10:45:00.000Z',
    stories: [],
    posts: [
      { id: 'p7', image: 'https://picsum.photos/seed/p7/800/800', caption: 'Weekend reading nook', likes: 610, comments: 22, createdAt: '2025-02-10T09:00:00.000Z' },
    ],
  },

  {
    id: 'u7', username: 'cinephile', fullName: 'Vikram Shah', bio: 'Movie reviews & recommendations', profileImage: 'https://picsum.photos/seed/u7/200/200', isVerified: false, isPrivate: false, followers: 4000, following: 120, postsCount: 60, createdAt: '2023-08-03T11:20:00.000Z', stories: [], posts: []
  },
  {
    id: 'u8', username: 'street.photog', fullName: 'Meera K.', bio: 'Street photography • Candid frames', profileImage: 'https://picsum.photos/seed/u8/200/200', isVerified: false, isPrivate: false, followers: 2300, following: 560, postsCount: 40, createdAt: '2022-12-01T07:00:00.000Z', stories: [], posts: []
  },
  {
    id: 'u9', username: 'plant.parent', fullName: 'Kabir Singh', bio: 'Urban jungle • Plant tips', profileImage: 'https://picsum.photos/seed/u9/200/200', isVerified: false, isPrivate: false, followers: 15000, following: 300, postsCount: 210, createdAt: '2018-05-14T09:00:00.000Z', stories: [], posts: []
  },
  {
    id: 'u10', username: 'fashion.daily', fullName: 'Rhea Das', bio: 'Daily outfits • Thrift flips', profileImage: 'https://picsum.photos/seed/u10/200/200', isVerified: true, isPrivate: false, followers: 98000, following: 420, postsCount: 540, createdAt: '2017-04-21T06:30:00.000Z', stories: [], posts: []
  },
  {
    id: 'u11', username: 'gadget_reviewz', fullName: 'Gadget Reviewz', bio: 'Unboxings • Honest reviews', profileImage: 'https://picsum.photos/seed/u11/200/200', isVerified: false, isPrivate: false, followers: 6700, following: 95, postsCount: 88, createdAt: '2021-10-10T10:10:00.000Z', stories: [], posts: []
  },
  {
    id: 'u12', username: 'daily.coder', fullName: 'Samir Patel', bio: 'Code snippets • JavaScript • React Native', profileImage: 'https://picsum.photos/seed/u12/200/200', isVerified: false, isPrivate: false, followers: 3400, following: 500, postsCount: 30, createdAt: '2024-07-01T08:00:00.000Z', stories: [], posts: []
  },
];

export default OtherUsersData;
