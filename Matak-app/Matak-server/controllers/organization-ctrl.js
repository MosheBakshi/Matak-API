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

checkOrganName = async(req, res, next) =>{
    try
    {
        const body = req.body
        const organ = await Organization.findOne({ Name: body.Name })
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
    checkOrganName
}