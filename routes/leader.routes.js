const router = require('express').Router()
const leaderController = require('../controllers/leader.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/list', leaderController.getLeaderList)
router.post('/list', auth(), leaderController.getPartnerList)

module.exports = router
