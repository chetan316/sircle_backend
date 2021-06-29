const router = require('express').Router()
const loginController = require('../controllers/login.controller')

router.post('/', loginController.userLogin)

module.exports = router
