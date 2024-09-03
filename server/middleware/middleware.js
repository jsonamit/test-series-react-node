const jwt = require("jsonwebtoken");
const CONSTANT = require('../config/constant.config');
const {decodeJwt} = require('../helpers/common.helper');

module.exports = {
    middleware: (req, res, next) => {

        try {
        
            let filterUrl = (req.url).split('?');

            if(CONSTANT.APPBYPASSURL.includes(filterUrl[0])) {
                req.isPublicUrl = true;
            }

            if(CONSTANT.DEBUGLIST.includes('3191333')) {
                req.isDeveloper = true;
            }

            if(req.isPublicUrl === true) {
                next();
                return;
            } 

            if(req.isDeveloper === true) {
                let user = {
                    name: 'Amit Kumar',
                    mobile: '7830583178'
                }
            } 

            // user = decodeJwt(req); // user info

            let authorizationToken = req.get("Authorization");

            if (authorizationToken) {
                let token = authorizationToken.split(' ')[1];
                jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            resp: 0,
                            message: "Invalid Token",
                            logout: true
                        });
                    } else {
                        next();
                    }
                })
            } 
            else {
                res.status(401).json({
                    resp: 0,
                    message: "Access Denied and Unauthorized User",
                    logout: true
                });
            }
        } catch(err) {
            next(err);
        }
    }
}