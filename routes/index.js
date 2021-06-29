const router = require('express').Router()
const auth = require('../middlewares/auth.middleware')
const user = require('./user.routes')
const login = require('./login.routes')
const signup = require('./signup.routes')
const leader = require('./leader.routes')
const plan = require('./plan.routes')
const post = require('./post.routes')

//  execute auth middleware
// router.use(auth())

//  all other routes
router.use('/user', user)
router.use('/login', login)
router.use('/signup', signup)
router.use('/leader', leader)
router.use('/plan', plan)
router.use('/post', post)

module.exports = router
