const User = require('../models/user-model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



async function getAllUsers(req, res) {
    const user = await User.find({});
    res.json({
      user,
      message: "Retrived successfully"
    });
  }
  
  async function getUser(req, res) {
    const user = await User.findOne({
      _id: req.params.id
    });
    res.json({
      user,
      message: "Found user successfully"
    });
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
    getUser,
    getAllUsers,
}