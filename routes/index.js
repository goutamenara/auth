var router = require('express').Router();
const path = require('path')
const passport = require('passport')
const passport_init = require("./../passport/custom_auth")
const verify_auth = require('./../lib/verify_auth')
const user = require('./../dbschema/user');

passport_init();

router.get('/',verify_auth,(req, res) => res.sendFile(path.resolve("./public/index.html")))

router.get('/logout',(req,res)=>{

	user.update({token : ""},{
		where : {token : req.body.token}
	})
	.then((updated)=>{
		if(updated === null){
			res.sendStatus(500)
		}
		else{
			res.sendStatus(200);
		}
		
	})

	
})



router.post('/signup',
	passport.authenticate('signup',{session:false}),
	(req,res)=>{
		res.sendStatus(200)
	}
)

router.post(
	'/login',
	passport.authenticate('login', {session: false,failureRedirect: '/login'}),
	(req,res)=>{
		if(req.token){
			res.json({"token" : req.token})
		}
	}
)

router.all("*",(req, res) => {
	res.sendStatus(404);
})



module.exports = router;