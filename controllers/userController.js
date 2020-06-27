const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

module.exports={
    //정보입력
auth : async (req, res) => {
    const {  
        user_name,
        user_email,
    } = req.body;
    // request data 확인 - 없다면 Bad Request 반환
    if (!user_name || !user_email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    //already ID
    const idx1 = await User.checkUser(user_email);
    if (idx1===true) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }
    const idx = await User.auth(user_name,user_email);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.redirect("/mail");
}
}