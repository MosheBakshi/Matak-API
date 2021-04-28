const jwt = require("jsonwebtoken")
const secrets = require('../middleware/config');

const verifyUser = async (req, res, next) => {
    //get authcookie from request
    const authcookie = req.cookies.token
    
    //verify token which is in cookie value
    jwt.verify(authcookie , secrets.jwtSecret,(err,data)=>{
     if(err){
       return res.sendStatus(403)
     } 
     else if(data.user){
      req.user = data.user
      next()
    }
 })
}

const tokenDecode = async (req, res, next) => {
  const authcookie = req.cookies.token
  jwt.verify(authcookie , secrets.jwtSecret,(err,data)=>{
    if(err){
      return res.json({success: false, data: {}})
    } 
    else if(data.user){
      return res.json({success: true, data: data.user})
   }
  })
} 

module.exports = {
    verifyUser: verifyUser,
    tokenDecode
}


