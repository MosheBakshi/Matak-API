const Car = require('../models/car-model')

// need to add update,get,getby...
createCar = (req, res, next) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Car',
        })
    }

    const car = new Car(body)

    if (!car) {
        return res.status(400).json({ success: false, error: err })
    }

    car
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: car._id,
                type: car.type,
                car_model: car.car_model,
                color: car.color,
                organization_id: car.organization_id, 
                liecene_number: car.liecene_number,
                contact_name: car.contact_name,
                message: 'Car created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Car not created!',
            })
        })
}

module.exports = {
    createCar,
}