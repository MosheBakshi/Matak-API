const jwt = require("jsonwebtoken")
const secrets = require('../middleware/config');


const isAdmin = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype != 'Admin') {
                return res.status(401).json({ success: false, error: 'User not admin' })
            }
        }
        next()
    })
}

const isMatak = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype != 'Matak') {
                return res.status(401).json({ success: false, error: 'User not matak' })
            }
        }
        next()
    })
}

const isMatakOrAdmin = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype == 'Arbel') {
                return res.status(401).json({ success: false, error: 'User not matak or admin' })
            }
        }
        next()
    })
}


const isArbel = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype != 'Arbel') {
                return res.status(401).json({ success: false, error: 'User not arbel' })
            }
        }
        next()
    })
}

const GetPathPermission = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const user = decodedToken.user
            var date = new Date(Date.now() - 24 * 60 * 60 * 1000 * 2)//2 Days
            if (user.User_Type == 'Arbel') {
                req.body = {"$or":
                    [{"Applicant_User_Id": user._id},
                    {"Is_Permanent": true},],
                           "$and":[{"End_Date":{"$gte":date}}] }
            }
            else {
                req.body = {"End_Date":{"$gte":date}}
            }
        }
        next()
    })
}

const GetPathByIdPermission = (req, res, next) => {
    req.body = {"_id":req.body._id}
    next()
}


const GetNotificationPermission = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const user = decodedToken.user
            if (user.User_Type == 'Arbel' || user.User_Type == 'Matak') {
                req.body = {
                     "$query": { "Reciver_Organization": user.Organization_Name }, "$orderby": {createdAt : -1 }
                 }
            }
            else { 
                req.body = {$query: {}, $orderby : {"createdAt" :-1 }}
            }
        }
        next()
    })
}

const GetUnreadLen = (req, res, next) => {
    const token = req.cookies.token || '';
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const user = decodedToken.user
            if (user.User_Type == 'Arbel' || user.User_Type == 'Matak') {
                req.body = { "Reciver_Organization": user.Organization_Name , "Read": false}
            }
            else {               
                req.body = {"Read":false}
            }
        }
        next()
    })

}
module.exports = {
    isAdmin,
    isArbel,
    isMatak,
    isMatakOrAdmin,
    GetPathPermission,
    GetNotificationPermission,
    GetUnreadLen,
    GetPathByIdPermission
};