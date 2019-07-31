var mongoose = require('mongoose');
let Users = require('../models/users');

const signupControl = (req, res) => {
    console.log(req.body);
    Users.findOne({ emailID: req.body.emailID }, (err, data1) => {
        if (err) {
            console.log('Database error');
            return res.send({
                message: "Database error."
            })
        }
        console.log(data1);
        if (!data1) {
            Users.create(req.body, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.send({
                        message: 'Database error, Signp Failed.',
                        success: false
                    })
                };
                if (data) {
                    return res.send({
                        message: 'Signup is successful. Going to Login page...',
                        success: true
                    })
                } else {
                    console.log('Field missing, Signup failed.');
                    return res.end({
                        message: 'Field missing, Signup failed.',
                        success: false
                    })
                }
            })
        }
        else {
            console.log('Account already exist.');
            return res.send({
                message: 'Account already exist, use different email ID',
                success: false
            })
        }
    })
}

module.exports = signupControl;