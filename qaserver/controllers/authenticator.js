const jwt = require('jsonwebtoken');

const authenticator = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['access-token'];//''
    // console.log(req.body.token);
    // console.log(token)
    if (token) {
        jwt.verify(token, 'bravoyoufoundthesecret', (err, decoded) => {
            console.log(err, 'No autherror');
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({
                        success: false,
                        message: 'Token expired on ' + err.expiredAt
                    })
                } else {
                    return res.json({
                        success: false,
                        message: 'Failed to auhtenticate Wrong token'
                    })
                }
            } else {
                req.decoded = decoded;
                console.log('Decoded token data', decoded)
                return next();
            }
        })
    } else {
        return res.send({
            success: false,
            message: 'No token provided'
        })
    }
}

module.exports = authenticator;