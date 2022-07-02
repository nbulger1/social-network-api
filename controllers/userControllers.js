const { User, Thought } = require("../models");

module.exports = {
  // Get all users api/users
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user by id api/users/:userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
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
      .then((thought) => {
        return Thought.deleteMany({ userId: req.params.userId });
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a user api/users/:userId
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createNewFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
