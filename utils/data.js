const usernames = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user8",
  "user9",
  "user10",
];

const emails = [
  "user1234@gmail.com",
  "user1382@gmail.com",
  "user1293@gmail.com",
  "user7893@gmail.com",
  "user1027@gmail.com",
  "user2345@gmail.com",
  "user1254@gmail.com",
  "user0146@gmail.com",
  "user2245@gmail.com",
  "user1233@gmail.com",
];

const thoughts = [
  "Trees are cool",
  "I love Starfish",
  "Airplanes are weird",
  "Starcrossed lovers don't exist",
  "Bubbles are the best",
  "Balloon animals are creepy",
  "Movies theaters should close",
  "I am awesome",
  "Koda is absolutely adorable",
];

const reactions = [
  "Wow",
  "Insane",
  "Silly",
  "Absurd",
  "Happily",
  "What in the world",
  "Only if the stars align",
  "Beautiful",
  "Ugly",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomThought = (int) => {
  const thoughtArray = [];
  for (let i = 0; i < int; i++) {
    thoughtArray.push({
      thoughtText: getRandomArrItem(thoughts),
      username: getRandomArrItem(usernames),
      reactions: [
        {
          reactionBody: getRandomArrItem(reactions),
        },
      ],
    });
  }
  return thoughtArray;
};

const getRandomUsers = (int) => {
  const userArray = [];
  for (let i = 0; i < int; i++) {
    userArray.push({
      username: getRandomArrItem(usernames),
      email: getRandomArrItem(emails),
    });
  }
  return userArray;
};

// Export the functions for use in seed.js
module.exports = {
  getRandomThought,
  getRandomUsers,
};
