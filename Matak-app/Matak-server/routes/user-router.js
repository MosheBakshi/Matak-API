const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserCtrl = require('../controllers/user-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')
const Permissions = require('../middleware/permissions')
const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");
/* CRUD */
protectedRouter.post('/users', Permissions.isAdmin, OrganCtrl.checkOrganName, UserCtrl.createUser)
protectedRouter.post('/users/get', UserCtrl.getUserBy)
protectedRouter.put('/users', UserCtrl.updateUser)
protectedRouter.delete('/users', UserCtrl.deleteUser)

/* LOGIN */
router.post('/users/login',UserCtrl.loginUser)

module.exports = router