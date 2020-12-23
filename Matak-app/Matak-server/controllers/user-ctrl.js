const User = require('../models/user-model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const organizationCtrl = require('./organization-ctrl');
const Organization = require('../models/organization-model');
const organizationModel = require('../models/organization-model');




getAllUsers = async (req, res, next) => {
  try
  {
      const body = req.body
      const users = await User.find({})
      if (!users.length) {
          const error = new Error('Users not found')
          error.status = 404
          throw error
      }
      return res.status(200).json({ success: true, data: users })
  }
  catch(e){
      console.log(e)
      return res.status(e.status).json({ success: false, error: e.message })
  }
}


getUserById = async (req, res, next) => {
  try
    {
        const body = req.body
        const users = await User.find({ _id: body._id })
        if (!users.length) {
            const error = new Error('User not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: users })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getUserByFirstName = async (req, res, next) => {
  try
    {
        const body = req.body
        const users = await User.find({ first_name: body.first_name })
        if (!users.length) {
            const error = new Error('User not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: users })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getUserByMobile = async (req, res, next) => {
  try
    {
        const body = req.body
        const users = await User.find({ mobile: body.Mobile })
        if (!users.length) {
            const error = new Error('User not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: users })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getUserByEmail = async (req, res, next) => {
  try
    {
        const body = req.body
        const users = await User.find({ Email: body.Email })
        if (!users.length) {
            const error = new Error('User not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: users })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getAllUsersByOrganName = async (req, res, next) => { 
  try
  {
    const body = req.body
    const users = await User.find({ organ_name: body.Name })
    if (!users.length) {
      const error = new Error('User not found')
      error.status = 404
      throw error
    }
    return res.status(200).json({ success: true, data: users })
    
  }
  catch(e)
  {
      console.log(e)
      return res.status(e.status).json({ success: false, error: e.message })
  }
}



loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username
  });

  if (!user) {
    throw Error("User not found");
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, "Cvbs!#56drsg575jrfsd@23456ewdg1", {
      expiresIn: "24h"
    });

    res.json({
      user,
      token,
      message: "Logged in successfully"
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}


createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
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
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                mobile: user.mobile,
                email: user.email,
                organ_id: user.organ_id,
                username: user.username,
                password: user.password,
                usertype: user.usertype,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
    getAllUsers,
    getUserByMobile,
    getUserByEmail,
    getUserByFirstName,
    getAllUsersByOrganName
}