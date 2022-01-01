const express = require('express');
var router = express.Router();
var models=require('../models');
const { Op } = require("sequelize");

const sequelize = models.sequelize
router.put("/:id",async (req,res,next)=>{
  try {
     await models.TAssistant.update(req.body.data
    ,{where:{id:req.params.id}})
    let doctors = await models.TAssistant.findOne({
      where:{id:req.params.id}
    });
    res.send(doctors).status(200);
  } catch (error) {
    console.log(error)
  }
})
router.post('/', async function (req, res, next) {
    try {
        await models.TAssistant.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});
router.post('/attendance',async function(req,res,next){
    try {
          let userdb = await models.tassistantAttendance.create(req.body.data);
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.get('/search/:search',async (req,res)=>{
    try {
      let userdb = await models.TAssistant.findAll({where:{name:{[Op.like]:`%${req.params.search}%`}}});
      res.send(userdb).status(200);
    } catch (error) {
      console.log(error);
    }
  })
  
  router.get('/attendance/:id/:weekno',async function(req,res,next){
    try {
          let weeklyRating = await models.tassistantAttendance.findAll({where:{weekno:req.params.weekno,tassistantId:req.params.id},
            include:[
              {model:models.course,as:"course",foreignKey:"courseId",attributes:[['title','label'],['id','value'],'code']},
          ]
          });
          res.send(weeklyRating).status(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.put('/attendance',async function(req,res,next){
    try {
          await models.tassistantAttendance.update(req.body.data,{where:{id:req.body.data.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.delete('/attendance/:id',async function(req,res,next){
    try {
          await models.tassistantAttendance.destroy({where:{id:req.params.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  
router.get('/', async (req, res, next) => {
    try {
        let TAssistants = await models.TAssistant.findAll();
        res.send(TAssistants).status(200);
    } catch (error) {
        console.log(error)
    }
})
router.get('/:id',async (req,res)=>{
    const id = req.params.id
    let tassistant = await models.TAssistant.findOne({where:{id}});
    let tassistantAttendance  = await models.tassistantAttendance.findAll({
        where:{tassistantId:id},
        attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
        group: ['weekno'],
    })
    let courses  = await models.course.findAll({where:{tassistantId:id}})
    let coursesRating = [];
    for(let course of courses){
        let secArr = []
        let LecStatus = await models.tassistantAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"محاضرة"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        console.log(LecStatus)
        LecStatus  !==null ?  secArr.push(LecStatus) : secArr.push([]);
        let SecStatus = await models.tassistantAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"تمرين"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        SecStatus !== null  ? secArr.push(SecStatus) : secArr.push([]);
        let LabStatus = await models.tassistantAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"معمل"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        LabStatus !==null  ?  secArr.push(LabStatus): secArr.push([]);
        coursesRating.push(secArr);

    }
    res.send({coursesRating,tassistantAttendance,tassistant,courses}).status(200)
})
router.post('/attendance',async function(req,res,next){
    try {
          let userdb = await models.tassistantAttendance.create(req.body.data);
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.get('/attendance/:id/:weekno',async function(req,res,next){
    try {
          let weeklyRating = await models.tassistantAttendance.findAll({where:{weekno:req.params.weekno,tassistantId:req.params.id},
            include:[
              {model:models.course,as:"course",foreignKey:"courseId",attributes:[['title','label'],['id','value'],'code']},
          ]
          });
          res.send(weeklyRating).status(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.put('/attendance',async function(req,res,next){
    try {
          await models.tassistantAttendance.update(req.body.data,{where:{id:req.body.data.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.delete('/attendance/:id',async function(req,res,next){
    try {
          await models.tassistantAttendance.destroy({where:{id:req.params.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
module.exports = router;
