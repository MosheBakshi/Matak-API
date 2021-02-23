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
    const body = req.body
    await Organization.findOneAndDelete({ _id: body._id }, (err, organ) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!organ) {
            return res
                .status(404)
                .json({ success: false, error: `Organization not found` })
        }

        return res.status(200).json({ success: true, data: organ })
    }).catch(err => console.log(err))
}


updateOrgan = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }

        await Organization.findOneAndUpdate({_id: body._id},{$set: body}, (err, organ) =>{
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if (!organ) {
            return res.status(404).json({
                success: false, 
                error: `Organization not found` })
        }
        organ.$set( body)
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    organ: organ,
                    message: 'Organization updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success: false, error: `Organization not updated` })
            })
        })
}

/* find organization by any data */
getOrganBy = async(req, res, next) =>{

        const body = req.body
        await Organization.find(body, (err, organ) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        // next()
        return res.status(200).json({ success: true,length: organ.length, data: organ })
    })
    .catch (e)
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
  

checkOrganName = async(req, res, next) =>{
    try
    {
        const body = req.body
        const organ = await Organization.findOne({ Name: body.Organization_Name })
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