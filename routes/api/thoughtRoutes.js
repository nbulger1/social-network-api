// GET all thoughts

// GET a single thought by id

// POST a new thought - associate the thought's id with the associated user's thought array field

// PUT to update a thought by id

// DELETE to remove a thought by id

// api/thoughts/:thoughId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

const { User, Thought } = require("../../models");

module.exports = {
  // Get all users api/thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user by id api/thoughts/:thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user api/thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user api/thoughts/:thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
