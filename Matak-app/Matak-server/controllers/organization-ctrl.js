const Organization = require('../models/organization-model')

createOrganization = (req, res, next) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Organization',
        })
    }

    const organization = new Organization(body)

    if (!organization) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Organization not created!',
            })
        })
}

deleteOrgan = async (req, res, next) => {
    try{
        const body = req.body
        const organ = await Organization.findOneAndDelete({ _id: body._id })
            if (!organ) {
                const error = new Error('Organization not found')
                error.status = 404
                throw error
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
        const error = new Error('You must provide a body to update')
        error.status = 400
        throw error
    }

        const organ = await Organization.findOneAndUpdate({_id: body._id},{$set:req.body})
        if (!organ) {
            const error = new Error('Organization not found!')
            error.status = 404
            throw error
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
                const err = new Error('Organization not updated!')
                err.status = 404
                throw err
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
            const error = new Error('Organization name not valid')
            error.status = 404
            throw error
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
            const error = new Error('Organization name not valid')
            error.status = 404
            throw error
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