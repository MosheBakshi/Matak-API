const Car = require('../models/car-model')

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

deleteCar = async (req, res, next) => {
    const body = req.body
    await Car.findOneAndDelete({ _id: body._id }, (err, car) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!car) {
            return res
                .status(404)
                .json({ success: false, error: `Car not found` })
        }

        return res.status(200).json({ success: true, data: car })
    }).catch(err => console.log(err))
}

updateCar = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }

        await Car.findOneAndUpdate({_id: body._id},{$set:req.body}, (err, car) =>{
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if (!car) {
            return res.status(404).json({
                success: false, 
                error: `Car not found` })
        }
        car.$set(req.body)
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    car: car,
                    message: 'Car updated!',
                })
            })
            .catch(er => {
                return res.status(404).json({
                    success: false, error: `Car not updated` })
            })
        })
}

/* find car by any data */
getCarBy = async(req, res, next) =>{
    const body = req.body
    const car = await Car.find(body,(err, car) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!car.length) {
            return res
                .status(404)
                .json({ success: false, error: `Car not found` })
        }
    return res.status(200).json({ success: true,length: car.length, data: car })
    }).catch(err => console.log(err))
}

module.exports = {
    createCar,
    updateCar,
    deleteCar,
    getCarBy,
    updateCar,
}