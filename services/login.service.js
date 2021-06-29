const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const HttpException = require('../utils/httpexception.utils')
const query = require('../config/db.connection')
const config = require('../config')
const { getParametersQuestionMark, handleResponse, multipleColumnSet } = require('../utils/common.utils')

exports.userLogin = async (data) => {
    // this.checkValidation(req);

    const { user_password, ...other } = data;
    try {

        const { columnSet, values } = multipleColumnSet(other)
        const sql = `CALL user_login(${columnSet})`

        const user = await query(sql, [...values])
        // if (!user)
        //     throw new HttpException(401, 'Unable to login!');

        const userData = user[0].length > 0 ? user[0][0] : null

        if (!userData)
            throw new HttpException(401, { error: 'Unable to login!' });

        const isMatch = await bcrypt.compare(user_password, userData.Password);

        if (!isMatch) {
            throw new HttpException(401, { error: 'Please enter valid details' });
        }

        // user matched!
        const token = jwt.sign({ user_id: userData.UserId }, config.secret, {
            expiresIn: '2days'
        });

        const { Password, ...withoutPassword } = userData;
        return handleResponse('success', StatusCodes.OK, [], [{ ...withoutPassword, token }])

    } catch (err) {
        throw err
    }
}

