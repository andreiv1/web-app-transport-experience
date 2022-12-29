const isUserAuth = require("./isUserAuth");

const checkSessionUserId = (req, res, userId, next) => {
    isUserAuth(req, res, () => {
        if(req.userdata.id === userId) {
            next();
        }
        else {
            return res.status(403).json({ "error": "Not Authorized!" })
        }
    });
}

module.exports = checkSessionUserId;