require('dotenv').config();

const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
    const token = req.body.authToken || req.headers["x-auth-token"]

    if(!token)
    {
        return res.status(403).json({"error": "Auth token is required"});
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //pass decoded data to request
        req.userdata = {
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role
        }

        next();
    }
    catch(err){
        return res.status(401).json({"error": "Token is invalid"})
    }

    
};

module.exports = isAuthorized;
