const { StatusCodes } = require('http-status-codes')

const HttpException = require('../utils/httpexception.utils')
const query = require('../config/db.connection')
const { handleResponse, multipleColumnSet } = require('../utils/common.utils')

const getLeaderList = async (data) => {
    const { columnSet, values } = multipleColumnSet(data)

    const sql = `CALL GetLeaderList(${columnSet})`

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

const getPartnerList = async (data) => {
    const { columnSet, values } = multipleColumnSet(data)

    const sql = `CALL GetPartnerDetails(${columnSet})`

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

module.exports = { getLeaderList, getPartnerList }
