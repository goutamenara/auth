const passport = require('passport');
const passportCustom = require('passport-custom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config=require('./../config');
const user = require('./../dbschema/user');

const CustomStrategy = passportCustom.Strategy;

let init = function(){

    // Login Strategy
    passport.use('login',new CustomStrategy(
        (req,callback) =>{
            if(req.body){
                if(req.body.username && req.body.password){
                    

                    user.findOne({where : {username:req.body.username}})
                    .then(user1 => {

                            if(user1 === null){
                                console.log("passport-login : username not matching")
                                callback(null,false)
                            }
                            else{
                                bcrypt.compare(req.body.password,user1.password, function(err, result) {
                                    if(!err){
                                        if(result){
                                            var token = jwt.sign({"user" : user1.username}, config.jwt.secret);
                                            req.token = token
                                            user.update({token : token},{
                                                where : {username : user1.username}
                                            })
                                            .then(()=>{
                                                callback(null,true)
                                            })
                                        }
                                        else{
                                            console.log("passport-login : password not matching.")
                                            callback(null,false)
                                        }

                                    }
                                    else{
                                        console.log("passport-login : password check failed.")
                                        callback(null,false)
                                    }
                                });

                            }
                                
                    })
                    .finally(()=>{
                        console.log("query finished")
                    })

                }
                else{
                    console.log("passport-login : username and password required !")
                    callback(null,false)
                }
                    
            }
            else{
                console.log("passport-login : no body found")
                callback(null,false)
            }
            
        }
    ))


    // Signup Strategy
    passport.use('signup',new CustomStrategy(
        (req,callback)=>{
            if(req.body){

                if(req.body.username && req.body.password){
                    var new_user_data = {
                        username : req.body.username,
                        password : req.body.password, 
                    }
                    if("email" in req.body){
                        new_user_data.email = req.body.email
                    }
                    // check user existence
                    user.findAll({where:{username:req.body.username}})
                    .then((user_in_db)=>{
                        if(user_in_db === null){
                            console.log("user already exists found" + user_in_db.username)
                            callback(null,false)
                        }
                        else{
                            console.log("new user")
                            bcrypt.hash(req.body.password, config.bcrypt.salt).then(function(hash){
                                new_user_data.password = hash
                                user.create(new_user_data)
                                .then(new_user =>{
                                    if(new_user === null){
                                        console.log("User creation failed")
                                        callback(null,false)
                                    }
                                    else{
                                        console.log("User created with id " + new_user.id )
                                        callback(null,true)
                                    }
                                })
    
                            });
                        }
                    })

                }
                else{
                    console.log("passport-signup :  Username and password required !")
                    callback(null,false)
                }
            }
            else{
                console.log("passport-signup :  No body found")
                callback(null,false)
            }
        }
    ))
    
}

module.exports = init