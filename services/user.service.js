const { StatusCodes } = require('http-status-codes')

const HttpException = require('../utils/httpexception.utils')
const query = require('../config/db.connection')
const { handleResponse, multipleColumnSet } = require('../utils/common.utils')

const validateUserId = async (data) => {
    const { columnSet, values } = multipleColumnSet(data)

    const sql = `CALL validate_email_mobile(${columnSet})`

    try {
        const result = await query(sql, [...values])
        const affectedRows = result ? result[0].length : 0

        if (affectedRows)
            throw new HttpException(400, [{ error: "User already exists" }])
        //return handleResponse(StatusCodes.INTERNAL_SERVER_ERROR, [], [{ error: "User already exists" }])
        else
            return handleResponse('success', StatusCodes.OK, [], [])
    } catch (err) {
        throw err
    }
}

const getUserList = async (data) => {
    console.log("🚀 ~ file: user.service.js ~ line 27 ~ getUserList ~ data", data)
    const { columnSet, values } = multipleColumnSet(data)
    const sql = `CALL get_user(${columnSet})`

    try {
        const result = await query(sql, [...values])
        const affectedRows = result ? result[0].length : 0

        if (!affectedRows)
            return handleResponse(StatusCodes.OK, [], [])
        else
            return handleResponse('success', StatusCodes.OK, [], result[0])
    } catch (err) {
        throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, err)
    }
}

module.exports = { validateUserId, getUserList }
