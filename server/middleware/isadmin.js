const auth = require("../middleware/auth");

const isAdmin = (req, res, next) => {
    
    auth(req, res, function () {
        if(req.userdata.role != 'admin'){
            return res.status(403).json({ "error": "Not Authorized!" })
        } else {
            next();
        }
    })
   
}

module.exports = isAdmin;