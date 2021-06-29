const { StatusCodes } = require('http-status-codes')
const leaderService = require('../services/leader.service')

const getLeaderList = async (req, res, next) => {
    try {
        const result = await leaderService.getLeaderList(req.body)
        // res.status(200).send(result)
        res.send(result)
    } catch (err) {
        next(err)
    }
}

const getPartnerList = async (req, res, next) => {
    try {
        const result = await leaderService.getPartnerList(req.body)
        res.send(result)
    } catch (err) {
        next(err)
    }
}

module.exports = { getLeaderList, getPartnerList }
