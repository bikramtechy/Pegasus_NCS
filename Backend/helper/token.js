const jwt = require('jsonwebtoken');

exports.create = (data)=>{
    return jwt.sign(data,process.env.JWT_PRIVATEKEY,{expiresIn: process.env.JWT_EXPIRES_IN});
}
exports.verify = (req , token)=>{
    return jwt.verify(token, process.env.JWT_PRIVATEKEY, function(err, decoded) {
        if(decoded){
            req.userId  = decoded.id
            req.roleId  = decoded.roleId
            return decoded
        }else{
            return false
        }
    });
}