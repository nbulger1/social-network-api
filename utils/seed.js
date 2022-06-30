const connection = require("../config/connection");
const { User, Thought } = require("../models");
// Import functions for seed data
const { getRandomColor, getRandomPost, genRandomIndex } = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Empty arrays for randomly generated posts and tags
  const users = [];
  const thoughts = [];

  // Function to make a post object and push it into the posts array
  const makeUser = (text) => {
    posts.push({
      published: Math.random() < 0.5,
      text,
      tags: [tags[genRandomIndex(tags)]._id],
    });
  };

  // Create 20 random tags and push them into the tags array
  for (let i = 0; i < 20; i++) {
    const thoughtname = getRandomColor();

    thoughts.push({
      tagname,
      color: thoughtname,
    });
  }

  // Wait for the tags to be inserted into the database
  await Thoughts.collection.insertMany(thoughts);

  // For each of the tags that exist, make a random post of length 50
  thoughts.forEach(() => makePost(getRandomPost(50)));

  // Wait for the posts array to be inserted into the database
  await User.collection.insertMany(users);

  // Log out a pretty table for tags and posts, excluding the excessively long text property
  console.table(thoughts);
  console.table(users, ["published", "tags", "_id"]);
  console.timeEnd("seeding");
  process.exit(0);
});
