const Sequelize = require('sequelize');

let debug = false;

const errorHandler = (err, req, res, next) => {
    console.log(err)
    let message = {}
    if(debug){
        message["debug"] = err;                
    }
    switch (true) {
        case err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError:
            const errMessages = {};
            err.errors.map(er => {
                errMessages[er.path] = er.message;
            })
            message["error"] = errMessages;
            res.status(500).send(message);
            break;

        case err instanceof Sequelize.ForeignKeyConstraintError:
            message["error"] = "Fields containing ids are invalid!";
            res.status(500).send(message);
            break;
        
        case err instanceof Sequelize.DatabaseError:
            message["error"] = "Data error!"
            res.status(500).send(message);
            break;

        default:
            message["error"] = "Internal server error!"
            
            res.status(500).send(message);
 

    }


}

module.exports = errorHandler;