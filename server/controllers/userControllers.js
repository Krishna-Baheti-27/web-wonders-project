import User from '../models/userModel.js';

function userSignup(req, res) {
  const { name, email, password } = req.body;
  User.create({ name, email, password })
    .then(user => {
      res.status(201).json({ message: "User registered successfully", user });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

function userLogin(req, res) {
  const { email, password } = req.body;
  User.find({ email, password })
    .then(user => {
      if (user.length > 0) {
        res.status(200).json({ message: "Login successful", user: user[0] });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

export { userSignup, userLogin };