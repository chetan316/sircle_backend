const { v4: uuidv4 } = require('uuid')
const { StatusCodes } = require('http-status-codes')

const HttpException = require('../utils/httpexception.utils')
const query = require('../config/db.connection')
const { getParametersQuestionMark, handleResponse, multipleColumnSet } = require('../utils/common.utils')
const { randomString } = require('../utils/common.utils')

const signUp = async (data) => {
    const referral_code = `${randomString(4)}-${randomString(4)}`
    data = { user_id: uuidv4(), referral_code, sircle_id: uuidv4(), ...data }
    const { columnSet, values } = multipleColumnSet(data)

    const sql = `CALL user_signup(${columnSet})`
    // const sql = `CALL user_signup(${getParametersQuestionMark(16)})`

    try {
        const result = await query(sql, [...values])
        const affectedRows = result ? result.affectedRows : 0
        const { user_password, ...withoutPassword } = data

        if (!affectedRows)
            return handleResponse(StatusCodes.INTERNAL_SERVER_ERROR, [{ error: 'Something went wrong' }], affectedRows)
        else
            return handleResponse('success', StatusCodes.OK, [], [{ ...withoutPassword, rows: affectedRows }])
    } catch (err) {
        let message = []
        if (err.sqlMessage && (err.sqlMessage.includes('usermaster.EmailId_UNIQUE') || err.sqlMessage.includes('usermaster.ContactNo_UNIQUE')))
            message.push({ error: 'User already exists' })

        throw new HttpException(400, message)
    }
}

module.exports = { signUp }
