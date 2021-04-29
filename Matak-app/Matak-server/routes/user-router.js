const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/user-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')


/* CRUD */
router.post('/users',Validations.verifyUser, Permissions.isAdmin, OrganCtrl.checkOrganName, UserCtrl.createUser)
router.post('/users/get',Validations.verifyUser, UserCtrl.getUserBy)
router.put('/users',Validations.verifyUser, UserCtrl.updateUser)
router.delete('/users',Validations.verifyUser, UserCtrl.deleteUser)

/* LOGIN */
router.post('/users/login',UserCtrl.loginUser)

router.get('/users/currentuser',Validations.tokenDecode)

module.exports = router