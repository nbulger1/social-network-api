const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  createNewFriend,
  deleteFriend,
} = require("../../controllers/userControllers.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friend/:friendId

router
  .route("/:userId/friend/:friendId")
  .put(createNewFriend)
  .delete(deleteFriend);

module.exports = router;
