// GET all users

// GET a single user by id and populated thought and friend data

// POST a new user

// PUT to update a user by id

// DELETE to remove a user by id (as well as associated thoughts - bonus)

// api/users/:userId/friends/:friendId

// POST to add a new friend

// DELETE to remove a friend

const { User, Thought } = require("../../models");

module.exports = {
  // Get all users api/users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user by id api/users/:userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user api/users
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user api/users/:userId
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : // figure this out
            User.deleteMany({ _id: { $in: thought.username } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user api/users/:userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
