export const users = [
  {
    id: 1,
    name: 'Young Gatchell',
    screenName: 'yg123',
    profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
  },
  {
    id: 2,
    name: 'Gatchell Young',
    screenName: 'gyoung',
    profileImageUrl: 'http://mrmrs.github.io/photos/p/2.jpg',
  },
  {
    id: 3,
    name: 'John Doe',
    screenName: 'johndoe',
    profileImageUrl: 'http://mrmrs.github.io/photos/p/3.jpg',
  },
  {
    id: 4,
    name: 'Jane Roe',
    screenName: 'janeroe',
    profileImageUrl: 'http://mrmrs.github.io/photos/p/4.jpg',
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
  {
    id: 4,
    createdAt: '2019-08-03T09:09:34.023Z',
    userId: 3,
    text:
      'Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello,\n\nWorld!',
    likeCount: 0,
    liked: false,
  },
  {
    id: 5,
    createdAt: '2019-08-03T09:09:34.023Z',
    userId: 4,
    text:
      'Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello, People of the World! Hello,\n\nWorld!',
    likeCount: 5,
    liked: false,
  },
];

export const mocks = {
  users,
  quacks,
};

// - helper functions - //

export function getMockQuacks(currentMocks = mocks) {
  const { quacks, users } = currentMocks;
  return quacks.map(quack => ({
    ...quack,
    userId: undefined,
    user: users.find(({ id }) => id === quack.userId),
  }));
}

export function getMockUserDetailPage(screenName, currentMocks = mocks) {
  const { quacks } = currentMocks;

  const user = getMockUser(screenName, currentMocks);
  if (!user) return null;

  return {
    ...user,
    quacks: quacks
      .filter(({ userId }) => userId === user.id)
      .map(quack => ({
        ...quack,
        userId: undefined,
        user,
      })),
  };
}

export function getMockUser(screenName, currentMocks = mocks) {
  const { users } = currentMocks;

  const user = users.find(user => screenName === user.screenName);
  if (!user) return null;

  return user;
}
