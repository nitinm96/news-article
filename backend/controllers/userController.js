const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register a user
//@route POST /api/users/register
//@access Public
const registerUser = async (req, res) => {
  //destructure username and password from request body
  const { username, password } = req.body;
  //validate the parameters
  if (!username || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    //check if user already exists
    let user = await userModel.findOne({ username });
    if (user) {
      return res.status(409).json({ error: "Username already exists" });
    }
    //create a new user
    user = new userModel({
      username,
      password,
    });

    // Hash the password
    user.password = await bcrypt.hash(password, 10);

    //save new user to database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

//@desc login a user
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res) => {
  //destructure username and password from request body
  const { username, password } = req.body;
  //validate the parameters
  if (!username || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  //find user in database
  try {
    let user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Incorrect username or account does not exist" });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    //generate access token if user exists and password is correct
    if (user && isMatch) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECECT,
        { expiresIn: "1d" }
      );
      res.status(200).json({ accessToken });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

//@desc get current user info
//@route GET /api/users/current
//@access private
const currentUser = async (req, res) => {
  //find user in database
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = { registerUser, loginUser, currentUser };
