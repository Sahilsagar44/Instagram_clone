import ProfileMentions from '../components/ProfileComponents/ProfileMentions/ProfileMentions';
import ProfilePosts from '../components/ProfileComponents/ProfilePosts';
import ProfileReels from '../components/ProfileComponents/ProfileReels';
import userProfilePosts from '../components/userProfileTabs/userProfilePosts';
import userProfileReels from '../components/userProfileTabs/userProfileReels';
import user from '../data/userData';
import usersPosts from './../data/postsData';
import userProfileMentions from './../components/userProfileTabs/userProfileMention';

// data/profileTabsConfig.js
export const myProfileTabs = [
    {
        name: "Posts",
        component: ProfilePosts,
        dataset: user.posts,
        activeIcon: require('../assets/icons/profilePosts.png'),
        inactiveIcon: require('../assets/icons/profilePosts(1).png'),
        size: 22,
    },
    {
        name: "Reels",
        component: ProfileReels,
        dataset: user.Reels,
        activeIcon: require('../assets/icons/reel(1).png'),
        inactiveIcon: require('../assets/icons/reel.png'),
        size: 27,
    },
    {
        name: "Mentions",
        component:ProfileMentions,
        dataset: user.mentions,
        activeIcon: require('../assets/icons/Mentions.png'),
        inactiveIcon: require('../assets/icons/Mentions(1).png'),
        size: 28,
    },
];
export const userProfileTabs = [
    {
        name: "Posts",
        component: userProfilePosts,
        dataset: usersPosts,
        activeIcon: require('../assets/icons/profilePosts.png'),
        inactiveIcon: require('../assets/icons/profilePosts(1).png'),
        size: 22,
    },
    {
        name: "Reels",
        component: userProfileReels,
        dataset: usersPosts,
        activeIcon: require('../assets/icons/reel(1).png'),
        inactiveIcon: require('../assets/icons/reel.png'),
        size: 27,
    },
    {
        name: "Mentions",
        component: userProfileMentions,
        dataset: usersPosts,
        activeIcon: require('../assets/icons/Mentions.png'),
        inactiveIcon: require('../assets/icons/Mentions(1).png'),
        size: 28,
    },
];
