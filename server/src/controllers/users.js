const User = require('../models/users')

const registerNewUser = async (req, res) => {
  try {
    const { username, email, password, location } = req.body;
    const user = new User({ username, email, password, location });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const loginUser = async (req, res) => {
  res.send("ok");
}

module.exports = { registerNewUser, loginUser }
