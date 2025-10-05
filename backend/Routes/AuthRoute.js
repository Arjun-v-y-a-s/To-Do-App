const { Signup, Login, HomePage } = require('../Controllers/AuthControllers.js')
const router = require('express').Router()
const {userVerification} = require('../Middlewares/AuthMiddleware.js');


router.post('/signup', Signup)
router.post('/login', Login)

router.post("/", userVerification, HomePage);

module.exports = router;