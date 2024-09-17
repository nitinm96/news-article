const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

//Create a new router to handle /users routes
const router = express.Router();

//register new user
router.post("/register", registerUser);

//login a register user
router.post("/login", loginUser);

//get current user information
router.get("/current", validateTokenHandler, currentUser);

module.exports = router;
