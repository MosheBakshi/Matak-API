const Organization = require('../models/organization-model')

createOrganization = (req, res) => {
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

checkOrganName = async(organ_name) =>{
    const organization = await Organization.find({ name: organ_name })
    if (!organization) {
        return false
    }
    return true
  }

module.exports = {
    createOrganization,
    checkOrganName
}