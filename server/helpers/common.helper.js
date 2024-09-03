const jwt = require('jsonwebtoken');

exports.decodeJwt = (req) =>{
    let authorizationToken = req.get("Authorization");
    let token = authorizationToken.split(' ')[1];
    let decode = jwt.decode(token, {complete: true});

    if(decode) {
        return {
            resp: 1,
            user: decode.payload,
            msg: 'Token decode successfully'
        }
    } else {
        return {
            resp: 0,
            msg: 'Error while decode token'
        }
    }
}