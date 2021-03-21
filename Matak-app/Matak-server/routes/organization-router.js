const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const OrganizationCtrl = require('../controllers/organization-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");
/* CRUD */
protectedRouter.post('/organization', OrganizationCtrl.createOrganization)
protectedRouter.post('/organization/get', OrganizationCtrl.getOrganBy)
protectedRouter.put('/organization', OrganizationCtrl.updateOrgan)
protectedRouter.delete('/organization', OrganizationCtrl.deleteOrgan)



module.exports = router