const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const CarCtrl = require('../controllers/car-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')


const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");


/* CRUD */
router.post('/car',OrganCtrl.checkOrganName, CarCtrl.createCar)
router.post('/car/get', CarCtrl.getCarBy)
router.put('/car', CarCtrl.updateCar)
router.delete('/car', CarCtrl.deleteCar)


module.exports = router