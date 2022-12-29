const isAuthorized = require("./isUserAuth");

const isAdmin = (req, res, next) => {
    isAuthorized(req, res, () => {
        if(req.userdata.role != 'admin'){
            return res.status(403).json({ "error": "Not Authorized!" })
        } else {
            next();
        }
    })
   
}

module.exports = isAdmin;