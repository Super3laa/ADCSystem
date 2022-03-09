const express = require('express');
var router = express.Router();
var models=require('../models');
const sequelize = models.sequelize;
const { Op } = require("sequelize");
const { checkTokenValidity } = require('../services/auth');
router.get('/search/:search',async (req,res)=>{
    try {
      let userdb = await models.Officer.findAll({where:{name:{[Op.like]:`%${req.params.search}%`}}});
      res.send(userdb).status(200);
    } catch (error) {
      console.log(error);
    }
  })
  router.put("/:id",async (req,res,next)=>{
    try {
       await models.Officer.update(req.body.data
      ,{where:{id:req.params.id}})
      let doctors = await models.Officer.findOne({
        where:{id:req.params.id}
      });
      res.send(doctors).status(200);
    } catch (error) {
      console.log(error)
    }
  })
router.post('/', async function (req, res, next) {
    try {
        await models.Officer.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.get('/',checkTokenValidity, async (req, res, next) => {
    try {
        let Officers = await models.Officer.findAll();
        res.send(Officers).status(200);
    } catch (error) {
        console.log(error)
    }
})
router.get('/:id',async (req,res)=>{
    const id = req.params.id
    let officer = await models.Officer.findOne({where:{id}});
    let officerAttendance  = await models.officerAttendance.findAll({
        where:{officerId:id},
        attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
        group: ['weekno'],
    })
    let courses  = await models.course.findAll({where:{officerId:id}})
    let coursesRating = [];
    for(let course of courses){
        let secArr = []
        let LecStatus = await models.officerAttendance.findAll({
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
        let SecStatus = await models.officerAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"تمرين"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        SecStatus !== null  ? secArr.push(SecStatus) : secArr.push([]);
        let LabStatus = await models.officerAttendance.findAll({
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
    res.send({coursesRating,officerAttendance,officer,courses}).status(200)
})
router.post('/attendance',async function(req,res,next){
    try {
          let userdb = await models.officerAttendance.create(req.body.data);
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.get('/attendance/:id/:weekno',async function(req,res,next){
    try {
          let weeklyRating = await models.officerAttendance.findAll({where:{weekno:req.params.weekno,officerId:req.params.id},
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
          await models.officerAttendance.update(req.body.data,{where:{id:req.body.data.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.delete('/attendance/:id',async function(req,res,next){
    try {
          await models.officerAttendance.destroy({where:{id:req.params.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  
module.exports = router;
