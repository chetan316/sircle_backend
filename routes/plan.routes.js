const router = require('express').Router()
const planController = require('../controllers/plan.controller')

router.post('/list', planController.getPlanList)

module.exports = router
