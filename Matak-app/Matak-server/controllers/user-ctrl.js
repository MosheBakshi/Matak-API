const User = require('../models/user-model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const errorHandler = require('../utils/errors')

getUserBy = async (req, res, next) => {
  try
  {
      const body = req.body
      const users = await User.find(body)
      if (!users.length) {
          throw errorHandler('Users not found', 404)
      }
      return res.status(200).json({ success: true, data: users })
  }
  catch(e){
      console.log(e)
      return res.status(e.statusCode).json({ success: false, error: e.message })
  }
}

loginUser = async (req, res, next) => {
  try
  {
    const body = req.body
    const user = await User.findOne({Username : body.Username})

    if (!user) {
      throw errorHandler('Username or password not valid', 404)
    }

    if (bcrypt.compareSync(body.Password, user.Password)) {
      const token = jwt.sign({ user }, "Cvbs!#56drsg575jrfsd@23456ewdg1", {
        expiresIn: "24h"
      });
      return res.status(200).json({success: true, username: user.Username, token: token, id: user._id});
    }

    else {
      throw errorHandler('Username or Password not valid',401)
    }
  }
  catch (e){
    console.log(e)
    return res.status(e.statusCode).json({ success: false, error: e.message })
  }
}


createUser = async (req, res, next) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({success: false,error: 'You must provide a user data',})
    }
    const user = new User(body)

    if (!user) {
      return res.status(400).json({ success: false, error: err })
    }

    try
    {
    const Username_Exists = await User.findOne({Username : body.Username})
    if (Username_Exists) {
        return res.status(400).json({ success: false, error: 'Username already exists' })
      }
    }
    catch(error){
      return res.status(500).json({ success: false, error: error })
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

deleteUser = async (req, res, next) => {
  const body = req.body
  await User.findOneAndDelete({ _id: body._id }, (err, user) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!user) {
          return res
              .status(404)
              .json({ success: false, error: `User not found` })
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
    await User.findOneAndUpdate({_id: body._id},{$set:req.body}, (err, user) =>{
    
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    
    if (!user) {
        return res.status(404).json({
            success: false, 
            error: `User not found` })
    }
    user.$set(req.body)
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