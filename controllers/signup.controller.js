const { hashPassword } = require('../utils/common.utils')
const signupService = require('../services/signup.service')
const loginService = require('../services/login.service')

const signUp = async (req, res, next) => {
    try {
        const plainPassword = req.body.user_password
        const encryptedPwd = await hashPassword(req.body.user_password)
        req.body.user_password = encryptedPwd

        const result = await signupService.signUp(req.body)
        if (result.status == 200) {
            const loginRequest = {
                login_id: result.data[0].contact_no,
                user_password: plainPassword,
                is_active: '1'
            }
            const loginResult = await loginService.userLogin(loginRequest)
            res.send(loginResult)
        } else {
            res.send(result)
        }
    } catch (err) {
        console.log("🚀 ~ file: signup.controller.js ~ line 23 ~ signUp ~ err", err)
        next(err)
    }
}

// const checkValidation = (req) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         throw new HttpException(400, 'Validation failed', errors);
//     }
// }

module.exports = { signUp }
