const express = require('express')
const router = express.Router()
const OrganizationCtrl = require('../controllers/organization-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')


/* CRUD */
router.post('/organization',Validations.verifyUser, Permissions.isAdmin, OrganizationCtrl.createOrganization)
router.post('/organization/get',Validations.verifyUser, Permissions.isAdmin, OrganizationCtrl.getOrganBy)
router.put('/organization',Validations.verifyUser, Permissions.isAdmin, OrganizationCtrl.updateOrgan)
router.delete('/organization',Validations.verifyUser, Permissions.isAdmin, OrganizationCtrl.deleteOrgan)



module.exports = router