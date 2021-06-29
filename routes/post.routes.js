const router = require('express').Router()
const postController = require('../controllers/post.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/create', auth(), postController.createPost)
router.post('/get', auth(), postController.getPost)

module.exports = router