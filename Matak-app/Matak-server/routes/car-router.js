const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const CarCtrl = require('../controllers/car-ctrl')
const OrganCtrl = require('../controllers/organization-ctrl')


const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");


/* CRUD */
protectedRouter.post('/car',OrganCtrl.checkOrganName, CarCtrl.createCar)
protectedRouter.post('/car/get', CarCtrl.getCarBy)
protectedRouter.put('/car', CarCtrl.updateCar)
protectedRouter.delete('/car', CarCtrl.deleteCar)


module.exports = router