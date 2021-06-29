const bcrypt = require('bcrypt')

exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input')
    }

    const keys = Object.keys(object)
    const values = Object.values(object)

    const columnSet = keys.map((key) => `?`).join(', ')
    // const columnSet = keys.map((key) => `${key} = ?`).join(', ')

    return {
        columnSet,
        values
    }
}

// hash password if it exists
exports.hashPassword = async (str) => {
    if (str) {
        str = await bcrypt.hash(str, 8)
    }
    return str
}

exports.getParametersQuestionMark = (len) => {
    const arrData = []
    for (let i = 0; i < len; i++) {
        arrData.push('?')
    }
    return arrData.join(',')
}

exports.randomString = (length, chars) => {
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result.toUpperCase()
}

exports.handleResponse = (type, status, message, data = []) => (
    {
        type,
        status,
        message,
        data,
        // error: [{
        //     code: error.code,
        //     message: error.message
        // }]
        // error: [
        //     error
        // ]
    }
)
