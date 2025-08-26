import colors from "../constants/colors";

const msgProfileIconsData = [
    {
        name: 'person-outline',
        color: colors.postIconColor,
        size: 25,
        iconName: 'Profile',
    },
    {
        name: 'search',
        color: colors.postIconColor,
        size: 25,
        iconName: 'Search',
    },
    {
        name: 'notifications-outline',
        color: colors.postIconColor,
        size: 25,
        iconName: 'Mute',
    },
    {
        name: 'dots-horizontal',
        color: colors.postIconColor,
        size: 25,
        iconName: 'Options',
        iconSet: 'MaterialCommunityIcons'
    },
]
export default msgProfileIconsData 

export const msgProfileBtnIconsData = [
    {
        name:'',
        size:25,
        color:colors.postIconColor,
        iconName:'Theme',
        iconSet:'image',
        source: require('D:/sahil/react_native/Instagram_clone/src/assets/icons/theme.png'),
        subTxt:'default'
    },
    {
        name:'',
        size:30,
        color:colors.postIconColor,
        iconName:'Disappearing messages',
        iconSet:'image',
        source:require('D:/sahil/react_native/Instagram_clone/src/assets/icons/disappearing.png'),
        subTxt:'Off'
    },
    {
        name:'lock-closed-outline',
        size:25,
        color:colors.postIconColor,
        iconName:'Privacy & safety',
        iconSet:'Ionicons',
    },
    {
        name:'',
        size:25,
        color:colors.postIconColor,
        iconName:'Nicknames',
        iconSet:'image',
        source:require('D:/sahil/react_native/Instagram_clone/src/assets/icons/nickname.png')
    },
    {
        name:'',
        size:25,
        color:colors.postIconColor,
        iconName:'Create a group chat',
        iconSet:'image',
        source:require('D:/sahil/react_native/Instagram_clone/src/assets/icons/group.png')
    },
];