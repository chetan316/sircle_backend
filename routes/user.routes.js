const router = require('express').Router()
const userController = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/validate', userController.validateUserId)
router.post('/list', auth(), userController.getUserList)

module.exports = router
