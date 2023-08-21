const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        //console.log(token);
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        //console.log(verifiedToken);

        const data = await User.findOne({_id : verifiedToken._id, "tokens.token" : token});

        if(!data){
            throw new Error('User Not Found');
        }
        else{
            req.token = token;
            req.rootUser = data;
            req.userID = data._id;
        }
        next();
    }catch(error){
        res.status(401).send({status : "401", error : "Unauthorized : No Token Provided"});
    }
}

module.exports = authenticate;