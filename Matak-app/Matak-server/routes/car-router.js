const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const CarCtrl = require('../controllers/car-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");


protectedRouter.post('/car', CarCtrl.createCar)
protectedRouter.put('/car/:id', CarCtrl.updateCar)//need to be fixed
protectedRouter.delete('/car/:id', CarCtrl.deleteCar)//need to be fixed
protectedRouter.post('/getcar', CarCtrl.getCarBy)//post

module.exports = router