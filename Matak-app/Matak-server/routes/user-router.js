const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserCtrl = require('../controllers/user-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')

const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

// POSTS
router.post('/user', UserCtrl.createUser)
router.post('/user/login',UserCtrl.loginUser)
<<<<<<< HEAD
router.post('/user/mobile',UserCtrl.getUserByMobile)
router.post('/user/email',UserCtrl.getUserByEmail)
router.post('/user/first_name',UserCtrl.getUserByFirstName)
router.post('/user/organ',UserCtrl.getAllUsersByOrganName)

// GETS
protectedRouter.get('/users', UserCtrl.getAllUsers)
protectedRouter.get('/user/:id', UserCtrl.getUserById)
=======
protectedRouter.post('/user/mobile',UserCtrl.getUserByMobile)
protectedRouter.post('/user/email',UserCtrl.getUserByEmail)
protectedRouter.post('/user/first_name',UserCtrl.getUserByFirstName)
router.post('/user/organ', OrganCtrl.checkOrganName, UserCtrl.getAllUsersByOrganName)

// GETS
protectedRouter.get('/users', UserCtrl.getAllUsers)
protectedRouter.get('/user/:id', UserCtrl.getUserById)//need to be fixed
>>>>>>> 17c8b0d004f2bd21f9228a80f59caccd6f17adf2


module.exports = router