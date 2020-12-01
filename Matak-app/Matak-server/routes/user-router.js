const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

// POSTS
router.post('/user', UserCtrl.createUser)
router.post('/user/login',UserCtrl.loginUser)

// GETS
protectedRouter.get('/users', UserCtrl.getAllUsers)
protectedRouter.get('/user/:id', UserCtrl.getUser)


module.exports = router