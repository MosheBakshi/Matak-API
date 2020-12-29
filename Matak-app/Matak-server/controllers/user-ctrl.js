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
    try
    {
      const body = req.body
      const user = new User(body)

      if (!user) {
        throw errorHandler('User not Created', 400)
      }

      const Username_Exists = await User.findOne({Username : body.Username})
      if (Username_Exists) {
        throw errorHandler('Username already exists', 409)
      }
      
      const Email_Exists = await User.findOne({Email : body.Email})
      if (Email_Exists) {
        throw errorHandler('Email already exists', 409)
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
    catch (e){
      console.log(e)
      return res.status(e.statusCode).json({ success: false, error: e.message })
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserBy,
}