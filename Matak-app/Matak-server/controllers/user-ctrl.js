const User = require('../models/user-model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const organizationCtrl = require('./organization-ctrl');
const Organization = require('../models/organization-model');
const organizationModel = require('../models/organization-model');




async function getAllUsers(req, res) {
    const user = await User.find({});
    res.json({
      user,
      message: "Retrived successfully"
    });
  }
  
  async function getUserById(req, res) {
    const user = await User.findOne({
      _id: req.params.id
    });
    res.json({
      user,
      message: "Found user successfully"
    });
  }

  async function getUserByFirstName(req, res) {
    const body = req.body
    const user = await User.find({
      name: body.name
    });
    res.json({
      user,
      message: "Found user successfully"
    });
  }

  async function getUserByMobile(req, res) {
    const body = req.body
    const user = await User.findOne({
      mobile: body.mobile
    });
    res.json({
      user,
      message: "Found user successfully"
    });
  }

  async function getUserByEmail(req, res) {
    const body = req.body
    const user = await User.findOne({
      email: body.email
    });
    res.json({
      user,
      message: "Found user successfully"
    });
  }

  getAllUsersByOrganName = async (req, res) => { 
    try
    {
      const body = req.body
      
      console.log(organizationCtrl.checkOrganName(body.name))
      if(organizationCtrl.checkOrganName(body.name)==false){
        return res.status(404).json({ success: false, error: `organization not valid` })
      }
     // const organization = await Organization.findOne({ name: body.name })
     // if (!organization) {
      //    return res.status(404).json({ success: false, error: `organization not valid` })
      //}
      const users = await User.find({ organ_name: body.name })
      if (!users.length) {
          return res
            .status(404)
            .json({ success: false, error: `Users not found` })
      }
      return res.status(200).json({ success: true, data: users })
    }
    catch(error){
        console.log(error)
    }
}



async function loginUser(req, res) {
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