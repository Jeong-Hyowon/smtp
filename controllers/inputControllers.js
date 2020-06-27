const Input = require('../models/input');
const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
module.exports={

    //email code
answer1 : async (req, res) => {
    const {user_email,randomString} = req.body;
    console.log(user_email);
    const idx = await Input.answer1(user_email,randomString);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    return res.redirect('/result/');
},
}
