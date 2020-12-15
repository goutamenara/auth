const jwt = require("jsonwebtoken");
const config = require("./../config")

let verify_auth = function(req,res,next){
    if("token" in req.cookies){
        try {
            jwt.verify(req.cookies.token,config.jwt.secret,(err,decoded)=>{
                if(!err){
                    return next();
                }
                res.redirect("/logout")
            });
        } catch(err) {
            res.redirect("/logout")
        }
    }
    else{
        res.redirect('/login')
    }
}

module.exports= verify_auth