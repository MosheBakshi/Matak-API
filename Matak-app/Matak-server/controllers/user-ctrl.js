const User = require('../models/user-model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secrets = require('../middleware/config');

getUserBy = async (req, res, next) => {
      const body = req.body
      await User.find(body, (err, users) => {
        if (err) {
          return res.status(400).json({ success: false, error: err })
        }
      return res.status(200).json({ success: true, data: users })
  })
  .catch(e => {
      console.log(e)
      return res.status(e.statusCode).json({ success: false, error: e.message })
  })
}

loginUser = async (req, res, next) => {
    const body = req.body
    await User.findOne({Username : body.Username}, (err,user) => {
    if (!user) {
      return res.status(404).json({success: false,error: 'Username or password not valid'})
    }
    if (bcrypt.compareSync(body.Password, user.Password)) {
      const token = jwt.sign({ user }, secrets.jwtSecret, {
        expiresIn: "24h"
      });
      res.cookie('token', token);
      // , { sameSite: 'none', httpOnly: true } - for development only
      return res.status(200).json({success: true, username: user.Username, id: user._id});
    }
    else {
      return res.status(401).json({success: false,error: 'Username or Password not valid'})
    }
  }).catch(err => console.log(err))
}

//checked
createUser = async (req, res, next) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({success: false,error: 'You must provide a user data',})
    }

    const user = new User(body)

    if (!user) {
      return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                data: user
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

//checked
deleteUser = async (req, res, next) => {
  const body = req.body
  const user = await User.findOne({ _id: body._id }, (err) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
  }).catch(err => console.log(err))
  if (!user) {
      return res
          .status(404)
          .json({ success: false, error: `User not found` })
  }
  await User.findOneAndDelete({ _id: body._id }, (err) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))
}


updateUser = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }
    await User.findOneAndUpdate({_id: body._id},{$set: body}, (err, user) =>{
    
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    
    if (!user) {
        return res.status(404).json({
            success: false, 
            error: `User not found` })
    }
    user.$set(body)
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                user: user,
                message: 'User updated!',
            })
        })
        .catch(error => {
            return res.status(404).json({
                success: false, error: `User not updated` })
        })
    })
}

module.exports = {
  getUserBy,
  loginUser,
  createUser,
  deleteUser,
  updateUser
}