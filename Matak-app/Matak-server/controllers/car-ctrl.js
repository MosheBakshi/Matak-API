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

updateCar = async (req, res, next) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Car.findOne({ _id: req.params.id }, (err, car) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Car not found!',
            })
        }
        car.name = body.name
        car.time = body.time
        car.rating = body.rating
        car
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: car._id,
                    message: 'Car updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Car not updated!',
                })
            })
    })
}

deleteCar = async (req, res, next) => {//need to fix
    try{
        const body = req.body
        const car = await Car.findOneAndDelete({ _id: body._id })
        if (!car) {
            const error = new Error('Car not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: car })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getCarBy = async (req, res, next) => {
    try
    {
        const body = req.body
        const cars = await Car.find(body)
        if (!cars.length) {
            const error = new Error('Car not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true,length: cars.length, data: cars })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

module.exports = {
    createCar,
    updateCar,
    deleteCar,
    getCarBy,
}