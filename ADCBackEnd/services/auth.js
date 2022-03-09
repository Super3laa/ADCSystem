const jwt = require("jsonwebtoken");
var models = require('../models');
const bcrypt = require('bcrypt');
module.exports = {
    giveMeLoginToken: async function (data) {
        return jwt.sign(
            { user: data },
            "WizzardOz",
            { expiresIn: "12h" });
    }, checkLoginData: async (req, res) => {
        try {
            let userDB = await models.user.findOne({
                where: {
                    username: req.body.data.username
                }
            })
            if (bcrypt.compareSync(req.body.data.password, userDB.dataValues.password)) {
                userDB.dataValues.password = "";
                return userDB;
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }, checkTokenValidity: async (req, res, next) => {
        const token = req.header("x-auth-token");
        if (!token) {
            console.log('No Token')
            return res.status(403).json({ msg: "No token, authorizaton denied" });
        }
        try {
            const decoded = jwt.verify(token, "WizzardOz");
            if (decoded.exp < decoded.iat) {
                console.log("ExpiredToken ...")
                return res.status(403).json({ msg: "Token Expired, authorizaton denied" });
            }
            req.user = decoded;
            next();
        } catch (e) {
            console.log("invalid Token")
            res.status(403).json({ msg: "Token is not valid" });
        }
    }
};