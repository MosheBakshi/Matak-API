const express = require('express')

const OrganizationCtrl = require('../controllers/organization-ctrl')

const router = express.Router()

router.post('/organization', OrganizationCtrl.createOrganization)

module.exports = router