const express = require('express');
var router = express.Router();
let auth=require('../services/auth.js');
var models=require('../models');
router.post('/getUser',async function(req,res,next){
  try {
      console.log(req.body.data)
    let userdb = await models.user.findOne({
        attributes:["id","username","permissions"],
        where:{id:req.body.data.id}
    })
    if(userdb){
      return res.status(200).send(userdb);
    } 
  } catch (error) {
      console.log(error);
  }
});

router.post('/login',async function (req,res,next){
    //chk pass send jwt
    try {
        let userDB = await auth.checkLoginData(req,res);
        if (userDB){
            let token = await auth.giveMeLoginToken(userDB);
            res.status(200).json({token});
        }else{
            res.status(301).send("Wrong Username or Passwrord")
          }
    } catch (error) {
        console.log(error);
        res.send("Error").status(401);
    }
});


/*router.put('/',auth.auth,function(req,res,next){
  const salt=bcrypt.genSaltSync();
  
  req.body.userObj.password=bcrypt.hashSync(req.body.userObj.password,salt);
   user.update(req.body.userObj,{where:{id:req.body.userObj.id}}).then((userDoc)=>{
    res.status(200).send("User has been updated successfully!");
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });

});*/

module.exports = router;