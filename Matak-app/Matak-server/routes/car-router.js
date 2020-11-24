const express = require('express')

const CarCtrl = require('../controllers/car-ctrl')

const router = express.Router()

router.post('/car', CarCtrl.createCar)

module.exports = router