const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

// POSTS
router.post('/user', UserCtrl.createUser)
router.post('/user/login',UserCtrl.loginUser)
protectedRouter.post('/user/mobile',UserCtrl.getUserByMobile)
protectedRouter.post('/user/email',UserCtrl.getUserByEmail)
protectedRouter.post('/user/first_name',UserCtrl.getUserByFirstName)
protectedRouter.post('/user/organ',UserCtrl.getAllUsersByOrganName)

// GETS
protectedRouter.get('/users', UserCtrl.getAllUsers)
protectedRouter.get('/user/:id', UserCtrl.getUserById)


module.exports = router