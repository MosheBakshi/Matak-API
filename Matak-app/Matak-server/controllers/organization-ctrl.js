const Organization = require('../models/organization-model')
const errorHandler = require('../utils/errors')


createOrganization = (req, res, next) => {
    try{
        const body = req.body
        if (!body) {
            throw errorHandler('You must provide a body to update', 400)
        }

        const organization = new Organization(body)

        if (!organization) {
            throw errorHandler('Organization scheme didn\'t allocated', 400)
        }

        organization
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: organization._id,
                    name: organization.name,
                    contact: organization.contact,
                    mobile: organization.mobile,
                    email: organization.email,
                    fax: organization.fax,
                    country: organization.country,
                    message: 'Organization created!',
                })
            })
            .catch(error => {
                throw errorHandler('Organization not created', 404)
            })
        }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

deleteOrgan = async (req, res, next) => {
    try{
        const body = req.body
        const organ = await Organization.findOneAndDelete({ _id: body._id })
            if (!organ) {
                throw errorHandler('Organization not found', 404)
            }
            return res.status(200).json({ success: true, data: organ })
        }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}


updateOrgan = async (req, res, next) => {
    try{
    const body = req.body
    if (!body) {
        throw errorHandler('You must provide a body to update', 400)
    }

        const organ = await Organization.findOneAndUpdate({_id: body._id},{$set:req.body})
        if (!organ) {
            throw errorHandler('Organization not found!', 404)
        }
        organ.$set(req.body)
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Organization updated!',
                })
            })
            .catch(er => {
                throw errorHandler('Organization not updated!', 404)
            })
        
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

/* find organization by any data */
getOrganBy = async(req, res, next) =>{
    try
    {
        const body = req.body
        const organ = await Organization.find(body)
        if (!organ) {
            throw errorHandler('Organization name not valid', 404)
        }
        // next()
        return res.status(200).json({ success: true,length: organ.length, data: organ })
    }
    catch (e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
  }

checkOrganName = async(req, res, next) =>{
    try
    {
        const body = req.body
        const organ = await Organization.findOne({ Name: body.Organ_Name })
        if (!organ) {
            throw errorHandler('Organization name not valid', 404)
        }
        next()
    }
    catch (e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

module.exports = {
    createOrganization,
    getOrganBy,
    deleteOrgan,
    updateOrgan,
    checkOrganName
}