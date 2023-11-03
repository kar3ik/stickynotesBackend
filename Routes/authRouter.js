const express = require('express');
const Cryptojs = require('crypto-js') 
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const dotenv = require('dotenv')
const router = express.Router()
dotenv.config()

router.route("/register").post(async (req, res) => {
    try {
      // Check if the user with the same email already exists
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        // User with the same email already exists
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      const newUser = new User({
        username: req.body.username,
        number: req.body.number,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
      });
  
      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch (err) {
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  


  router.route("/login").post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json({ message: "invalid email" })

        const decodePasswd = Cryptojs.AES.decrypt(user.password, process.env.SECRET_KEY).toString(Cryptojs.enc.Utf8)
        decodePasswd !== req.body.password && res.status(401).json({ message: "incorrect password" })

        const { password, ...rest } = user._doc
        const accessToken = jwt.sign({ username: user.username }, process.env.Token);
        // console.log(accessToken)

        res.json({ ...rest, accessToken })
    } catch (err) {
        res.status(500).json({ message: 'Error logging user' });
    }
})


module.exports = router