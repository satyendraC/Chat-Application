const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const err = new Error("not authenticated");
        err.statusCode = 401;
        throw err;
    }

    const token = authHeader.split(" ")[1];

    let decodeToken;

    try {
        decodeToken = jwt.verify(token, "checkUserIsThereOrnot");
    } catch (error) {
        const err = new Error("Interal server error");
        err.statusCode = 500;
        throw err;
    }

    if(!decodeToken){
        const err = new Error("not authenticated");
        err.statusCode = 500;
        throw err;
    }

    req.loadedUser = decodeToken.loadedUser;
    next();
}
