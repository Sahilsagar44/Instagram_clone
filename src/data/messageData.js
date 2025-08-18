const messageData = [
  {
    id: "1",
    user: {
      name: "Alice Johnson",
      username: "alicejohnson",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    lastMessage: "Hey! How are you?",
    timestamp: "1 hr ago",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        text: "Hey! How are you?",
        sentByMe: false,
        timestamp: "today, 9:00 AM"
      },
      {
        id: "m2",
        text: "I'm good, thanks!",
        sentByMe: true,
        timestamp: "today, 9:05 AM"
      }
    ]
  },
  {
    id: "2",
    user: {
      name: "Bob Smith",
      username: "bobsmith",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    lastMessage: "See you at 5pm?",
    timestamp: "6 hr ago",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "See you at 5pm?",
        sentByMe: false,
        timestamp: "today, 2:30 PM"
      }
    ]
  },
  {
    id: "3",
    user: {
      name: "Charlie Green",
      username: "charliegreen",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    lastMessage: "Check this out!",
    timestamp: "2 days ago",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        text: "Check this out!",
        sentByMe: false,
        timestamp: "yesterday, 3:10 PM"
      },
      {
        id: "m2",
        text: "Wow, that's cool.",
        sentByMe: true,
        timestamp: "yesterday, 3:11 PM"
      }
    ]
  },
  {
    id: "4",
    user: {
      name: "Diana Rose",
      username: "dianarose",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    lastMessage: "Are you coming to the party?",
    timestamp: "3 hr ago",
    unreadCount: 3,
    messages: [
      {
        id: "m1",
        text: "Are you coming to the party?",
        sentByMe: false,
        timestamp: "today, 7:00 AM"
      },
      {
        id: "m2",
        text: "Yes, I'll be there!",
        sentByMe: true,
        timestamp: "today, 7:30 AM"
      }
    ]
  },
  {
    id: "5",
    user: {
      name: "Ethan Blue",
      username: "ethanblue",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    lastMessage: "Let's catch up soon.",
    timestamp: "4 days ago",
    unreadCount: 4,
    messages: [
      {
        id: "m1",
        text: "Let's catch up soon.",
        sentByMe: false,
        timestamp: "19 Jul, 10:40 AM"
      }
    ]
  }
];

export default messageData;
