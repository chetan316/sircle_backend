const { StatusCodes } = require('http-status-codes')
const { hashPassword, handleResponse } = require('../utils/common.utils')
const HttpException = require('../utils/httpexception.utils')
const signupService = require('../services/signup.service')
const userService = require('../services/user.service')

const validateUserId = async (req, res, next) => {
    try {
        const result = await userService.validateUserId(req.body)

        res.status(200).send(result)
    } catch (err) {
        next(err)
        // console.log(err)
    }
}

// const checkValidation = (req) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         throw new HttpException(400, 'Validation failed', errors);
//     }
// }

const getUserList = async (req, res, next) => {
    try {
        const result = await userService.getUserList(req.body)
        res.send(result)
    } catch (err) {
        next(err)
    }
}

module.exports = { validateUserId, getUserList }
