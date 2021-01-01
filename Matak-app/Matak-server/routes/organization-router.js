const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const OrganizationCtrl = require('../controllers/organization-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");
/* CRUD */
router.post('/organization', OrganizationCtrl.createOrganization)
router.get('/organization', OrganizationCtrl.getOrganBy)
router.put('/organization', OrganizationCtrl.updateOrgan)
router.delete('/organization', OrganizationCtrl.deleteOrgan)



module.exports = router