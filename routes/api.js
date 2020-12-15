var router = require('express').Router();
const verify_auth = require('./../lib/verify_auth')

router.use(verify_auth);

router.get('/',(req,res)=>{
    res.send("Api Routes Here")
})


router.all("*",(req, res) => {
	res.sendStatus(404);
})

module.exports = router;