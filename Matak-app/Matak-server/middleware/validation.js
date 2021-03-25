const jwt = require("jsonwebtoken")

 const verifyUser = async (req, res, next) => {
    //get authcookie from request
    const authcookie = req.cookies.token
    
    //verify token which is in cookie value
    jwt.verify(authcookie ,"Cvbs!#56drsg575jrfsd@23456ewdg1",(err,data)=>{
     if(err){
       res.sendStatus(403)
     } 
     else if(data.user){
      req.user = data.user
      next()
    }
 })
}

module.exports = {
    verifyUser: verifyUser
}