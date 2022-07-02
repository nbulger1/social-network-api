const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomThought, getRandomUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  const thoughts = getRandomThought(5);
  console.log(thoughts);

  const users = [
    { username: "user10", email: "user2345@gmail.com" },
    { username: "user9", email: "user2245@gmail.com" },
    { username: "user6", email: "user1293@gmail.com" },
    { username: "user1", email: "user1233@gmail.com" },
    { username: "user3", email: "user1027@gmail.com" },
  ];
  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
