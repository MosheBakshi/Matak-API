const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserCtrl = require('../controllers/user-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')

const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

protectedRouter.get('/users', UserCtrl.getUserBy)
router.post('/users',OrganCtrl.checkOrganName, UserCtrl.createUser)
router.post('/users/login',UserCtrl.loginUser)
// protectedRouter.put('/users', UserCtrl.updateUser)
// protectedRouter.delete('users', UserCtrl.deleteUser)


module.exports = router