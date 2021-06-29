const router = require('express').Router()
// const userController = require('../controllers/user.controller')
const signupController = require('../controllers/signup.controller')

router.post('/create', signupController.signUp)

module.exports = router