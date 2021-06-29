const { v4: uuidv4 } = require('uuid')
const { StatusCodes, UNAUTHORIZED } = require('http-status-codes')

const HttpException = require('../utils/httpexception.utils')
const query = require('../config/db.connection')
const { handleResponse, multipleColumnSet } = require('../utils/common.utils')

const createPost = async (data) => {
    data = { post_id: uuidv4(), ...data }
    const { columnSet, values } = multipleColumnSet(data)

    const sql = `CALL CreatePost(${columnSet})`

    try {
        const result = await query(sql, [...values])
        console.log("🚀 ~ file: post.service.js ~ line 14 ~ createPost ~ result", result)
        const affectedRows = result ? result[0].length : 0

        if (!affectedRows)
            return handleResponse(StatusCodes.BAD_REQUEST, [], [])
        else
            return handleResponse('success', StatusCodes.OK, [], result[0])
    } catch (err) {
        throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, err)
    }
}

const getPost = async (data) => {
    console.log("🚀 ~ file: post.service.js ~ line 29 ~ getPost ~ data", data)
    const { columnSet, values } = multipleColumnSet(data)

    const sql = `CALL GetPost(${columnSet})`

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

module.exports = { createPost, getPost }
