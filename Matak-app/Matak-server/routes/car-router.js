const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const CarCtrl = require('../controllers/car-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");


router.post('/car', CarCtrl.createCar)
router.put('/car/', CarCtrl.updateCar)
router.delete('/car', CarCtrl.deleteCar)
router.get('/car', CarCtrl.getCarBy)

module.exports = router