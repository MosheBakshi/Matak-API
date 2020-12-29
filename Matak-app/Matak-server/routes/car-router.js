const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const CarCtrl = require('../controllers/car-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");


router.post('/car', CarCtrl.createCar)
router.put('/car/:id', CarCtrl.updateCar)//need to be fixed
router.delete('/car', CarCtrl.deleteCar)//need to be fixed
router.get('/car', CarCtrl.getCarBy)//get

module.exports = router