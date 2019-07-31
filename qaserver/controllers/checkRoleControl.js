var mongoose = require("mongoose");

const Users = require('../models/users');

const checkRoleControl = async (req, res) => {
    try {
        console.log(req.body, 'req');
        let user = await Users.findOne({ _id: req.decoded.userId });
        res.send({
            success : true,
            role : user.role
        })
    } catch (err){
        console.log(err);
        res.send({
            success: false,
            message: 'Database error in checking role.'
        })
    }
}

module.exports = checkRoleControl;