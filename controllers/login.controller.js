const { StatusCodes } = require('http-status-codes')
const { hashPassword, handleResponse } = require('../utils/common.utils')
const HttpException = require('../utils/httpexception.utils')
const loginService = require('../services/login.service')

const userLogin = async (req, res, next) => {
    try {
        // checkValidation(req)
        const result = await loginService.userLogin(req.body)

        res.status(200).send(result)
    } catch (err) {
        console.log("🚀 ~ file: login.controller.js ~ line 13 ~ userLogin ~ err", err)
        next(err)
        // console.log(err)
    }
}

module.exports = { userLogin }