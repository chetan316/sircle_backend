const planService = require('../services/plan.service')

const getPlanList = async (req, res, next) => {
    try {
        const result = await planService.getPlanList(req.body)
        res.send(result)
    } catch (err) {
        next(err)
    }
}

module.exports = { getPlanList }
