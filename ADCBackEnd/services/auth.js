const jwt = require("jsonwebtoken");
var models=require('../models');
const bcrypt = require('bcrypt');
module.exports = {
   giveMeLoginToken:async function(data){
    return jwt.sign(
      { user: data },
      "WizzardOz",
      { expiresIn: "12h" });
  },checkLoginData:async(req,res)=>{
    try {
        let userDB = await models.user.findOne({
            where:{
                username : req.body.data.username
            }
        })
        if(bcrypt.compareSync(req.body.data.password,userDB.dataValues.password)){
            userDB.dataValues.password = "";
            return userDB;
        }else{
            return false
        }   
    } catch (error) {
        console.log(error)
    }
  }
};