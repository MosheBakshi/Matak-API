const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserCtrl = require('../controllers/user-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')

const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");
/* CRUD */
router.post('/users', OrganCtrl.checkOrganName, UserCtrl.createUser)
protectedRouter.get('/users', UserCtrl.getUserBy)
router.put('/users', UserCtrl.updateUser)
router.delete('/users', UserCtrl.deleteUser)

/* LOGIN */
router.post('/users/login',UserCtrl.loginUser)

module.exports = router