require('dotenv').config();

const jwt = require("jsonwebtoken");

const isUserAuth = (req, res, next) => {
    const bearerHeader = req.headers["authorization"]

    if(!bearerHeader)
    {   
        return res.status(403).json({"error": "Auth token is required"});
    }
    try{
        const token = bearerHeader.split(' ')[1]
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

module.exports = isUserAuth;
