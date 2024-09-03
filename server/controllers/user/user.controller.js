const jwt = require("jsonwebtoken");
const User = require('../../db/models/user/User');

exports.login = async (req, res) => { 

    try {
        let params = req.body;
    
        if(!params.email || !params.password) {
            res.send({
                resp: 0,
                msg: 'Missing email or password'
            });
            return;
        }
    
        let user = await User.findOne({where: { email: params.email }});
    
        if (!user) {
            res.send({
                resp: 0,
                msg: 'User not found'
            });
            return;
        }
    
        const isPasswordValid = (user.password === params.password); 
    
        if (!isPasswordValid) {
            res.send({
                resp: 0,
                msg: 'Incorrect password'
            });
            return;
        }
    
        let token = jwt.sign(
            { name: user.name, email: user.email}, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );
    
        res.send({
            resp: 1,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            },
            msg: 'User logged in Successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error !!'
        });
    }
}

exports.signup = async (req, res) => { 

    try {
        let params = req.body;
    
        if(!params.email || !params.password || !params.name) {
            res.send({
                resp: 0,
                msg: 'Missing parameters'
            });
            return;
        }
    
        let userData = await User.findOne({where: { email: params.email }});
    
        if(userData && (userData.email == params.email)) {
            res.send({
                resp: 0,
                msg: 'The email id already exists'
            });
            return;
        }
    
        let user = await User.create(params);
    
        if(!user) {
            res.send({
                resp: 0,
                msg: 'Internal server error'
            });
        } 
        else {
            let token = jwt.sign(
                { data: {name: user.name, email: user.email} }, 
                process.env.JWT_SECRET_KEY, 
                { expiresIn: process.env.TOKEN_EXPIRY_TIME }
            );
    
            res.send({
                resp: 1,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token
                },
                msg: 'User created Successfully'
            });
        }
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error'
        });
    }
}
