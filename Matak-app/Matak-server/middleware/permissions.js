const jwt = require("jsonwebtoken")

const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, 'Cvbs!#56drsg575jrfsd@23456ewdg1', (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype != 'Admin') {
                return res.status(401).json({ success: false, error: 'User no admin' })
            }
        }
        next()
    })
}

const isMatak = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, 'Cvbs!#56drsg575jrfsd@23456ewdg1', (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype != 'Matak') {
                return res.status(401).json({ success: false, error: 'User no matak' })
            }
        }
        next()
    })
}

const isArbel = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, 'Cvbs!#56drsg575jrfsd@23456ewdg1', (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            const usertype = decodedToken.user.User_Type  
            if (usertype != 'Arbel') {
                return res.status(401).json({ success: false, error: 'User no arbel' })
            }
        }
        next()
    })
}

module.exports = {
    isAdmin,
    isArbel,
    isMatak
};