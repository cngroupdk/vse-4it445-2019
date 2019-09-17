export const users = [
  {
    id: 1,
    name: 'Young Gatchell',
    screenName: 'yg123',
    profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
  },
  {
    id: 2,
    name: 'Gatchell Young ',
    screenName: 'gyoung',
    profileImageUrl: 'http://mrmrs.github.io/photos/p/2.jpg',
  },
];

export const quacks = [
  {
    id: 1,
    createdAt: '2019-08-08T05:43:18.023Z',
    userId: 1,
    text: 'Hello, People of the World!',
    likeCount: 399,
    liked: true,
  },
  {
    id: 2,
    createdAt: '2019-08-06T14:10:51.023Z',
    userId: 2,
    text: 'Como setas?',
    likeCount: 2,
    liked: false,
  },
  {
    id: 3,
    createdAt: '2019-08-03T09:09:34.023Z',
    userId: 1,
    text:
      'Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello,\n\nWorld!',
    likeCount: 0,
    liked: false,
  },
];

export const mocks = {
  users,
  quacks,
};
