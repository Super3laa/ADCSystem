const express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');

router.post('/', async function (req, res, next) {
    try {
        await models.course.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let token = req.headers['x-auth-token'];
        var decoded = jwt.verify(token, 'WizzardOz');
        let courses = await models.course.findAll({
            where:{type:decoded.user.type !== "عام" && decoded.user.type 
        },
            include:[
            {model:models.Doctor,as:"Doctor",foreignKey:"doctorId",attributes:[['name','label'],['id','value']]},
            {model:models.Officer,as:"Officer",foreignKey:"OfficerId",attributes:[['name','label'],['id','value']]},
            {model:models.TAssistant,as:"TAssistant",foreignKey:"TAssistantId",attributes:[['name','label'],['id','value']]},
          ],raw:true});
        let doctors = await models.Doctor.findAll({attributes:[['name','label'],['id','value']]});
        let officers = await models.Officer.findAll({attributes:[['name','label'],['id','value']]});
        let tassistants = await models.TAssistant.findAll({attributes:[['name','label'],['id','value']]});    
        res.send({courses,doctors,officers,tassistants}).status(200);
    } catch (error) {
        console.log(error)
    }
})
router.put('/',async function(req,res,next){
    try {
          await models.course.update(req.body.data,{where:{id:req.body.data.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.delete('/:id',async function(req,res,next){
    try {
          await models.course.destroy({where:{id:req.params.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });

module.exports = router;
