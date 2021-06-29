const jwt = require('jsonwebtoken')

const HttpException = require('../utils/httpexception.utils')
// const UserModel = require('../models/user.model')

const config = require('../config')
const userService = require('../services/user.service')

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization
            const bearer = 'Bearer '

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied!')
            }

            const token = authHeader.replace(bearer, '')
            const secretKey = config.secret || ""

            // Verify Token
            const decoded = jwt.verify(token, secretKey)
            // const data = {
            //     user_id: decoded.user_id,
            //     is_active: '1'
            // }
            // const user = await userService.getUserList(data)
            // console.log("🚀 ~ file: auth.middleware.js ~ line 29 ~ user", user.data.length)

            // if (!user) {
            //     throw new HttpException(401, 'Authentication failed!')
            // }

            // check if the current user is the owner user
            // const ownerAuthorized = req.params.id == user.id

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            // if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
            //     throw new HttpException(401, 'Unauthorized')
            // }

            // if (roles.length && !roles.includes(user.role)) {
            //     throw new HttpException(401, 'Unauthorized')
            // }

            // if the user has permissions
            // req.currentUser = user
            req.body.user_id = decoded.user_id
            next()

        } catch (e) {
            e.status = 401
            next(e)
        }
    }
}

module.exports = auth
