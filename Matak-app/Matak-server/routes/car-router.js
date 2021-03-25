const express = require('express')
const router = express.Router()
const CarCtrl = require('../controllers/car-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')



/* CRUD */
router.post('/car',Validations.verifyUser,OrganCtrl.checkOrganName, CarCtrl.createCar)
router.post('/car/get',Validations.verifyUser, CarCtrl.getCarBy)
router.put('/car',Validations.verifyUser, CarCtrl.updateCar)
router.delete('/car',Validations.verifyUser, CarCtrl.deleteCar)


module.exports = router