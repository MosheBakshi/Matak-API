const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const OrganizationCtrl = require('../controllers/organization-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

router.post('/organization', OrganizationCtrl.createOrganization)
router.put('/organization', OrganizationCtrl.updateOrgan)
router.delete('/organization', OrganizationCtrl.deleteOrgan)
router.post('/getorganby', OrganizationCtrl.getOrganBy)


module.exports = router