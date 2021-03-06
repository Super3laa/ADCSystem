const express = require('express');
var router = express.Router();
var models = require('../models');
const sequelize = models.sequelize
const { Op } = require("sequelize");
const { checkTokenValidity } = require('../services/auth');
router.get('/search/:search',async (req,res)=>{
    try {
      let userdb = await models.Doctor.findAll({where:{name:{[Op.like]:`%${req.params.search}%`}}});
      res.send(userdb).status(200);
    } catch (error) {
      console.log(error);
    }
  })
router.post('/', async function (req, res, next) {
    try {
        await models.Doctor.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.get('/', checkTokenValidity,async (req, res, next) => {
    try {
        let Doctors = await models.Doctor.findAll();
        res.send(Doctors).status(200);
    } catch (error) {
        console.log(error)
    }
})
router.post('/AttendanceAll',async(req,res)=>{
  console.log(req.body)
  let doctors = await models.Doctor.findAll({attribuit:['id','name'],raw:true});
  let data = [];
  for(let i = 0 ; i < doctors.length ; i++){
    let docAttendance = await models.doctorAttendance.findAll({where:{doctorId:doctors[i].id,date:{
      [Op.gte]:req.body.datatime.from,
      [Op.lte]:req.body.datatime.to
    }},attributes:['status','date','type'],order:[['date','ASC']],raw:true})
    data.push({name:doctors[i].name,attendance:docAttendance});
  }
  res.send(data).status(200);
})
router.get('/:id',async (req,res)=>{
    const id = req.params.id
    let doctor = await models.Doctor.findOne({where:{id}});
    let doctorAttendance  = await models.doctorAttendance.findAll({
        where:{doctorId:id},
        attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
        group: ['weekno'],
    })
    let courses  = await models.course.findAll({where:{[Op.or]:[{doctorId:id},{secdoctorId:id}]}})
    console.log(courses)
    let coursesRating = [];
    for(let course of courses){
        let secArr = []
        let LecStatus = await models.doctorAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                doctorId:id,
                type:"????????????"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        LecStatus  !==null ?  secArr.push(LecStatus) : secArr.push([]);
        let SecStatus = await models.doctorAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                doctorId:id,
                type:"??????????"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        SecStatus !== null  ? secArr.push(SecStatus) : secArr.push([]);
        let LabStatus = await models.doctorAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"????????",
                doctorId:id,

            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        LabStatus !==null  ?  secArr.push(LabStatus): secArr.push([]);
        coursesRating.push(secArr);

    }
    res.send({coursesRating,doctorAttendance,doctor,courses}).status(200)
})
router.post('/attendance',async function(req,res,next){
    try {
          let userdb = await models.doctorAttendance.create(req.body.data);
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.get('/attendance/:id/:weekno',async function(req,res,next){
    try {
          let weeklyRating = await models.doctorAttendance.findAll({where:{weekno:req.params.weekno,doctorId:req.params.id},
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
          await models.doctorAttendance.update(req.body.data,{where:{id:req.body.data.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  router.delete('/attendance/:id',async function(req,res,next){
    try {
          await models.doctorAttendance.destroy({where:{id:req.params.id}});
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
  });
  
  router.put("/:id",async (req,res,next)=>{
    try {
       await models.Doctor.update(req.body.data
      ,{where:{id:req.params.id}})
      let doctors = await models.Doctor.findOne({
        where:{id:req.params.id}
      });
      res.send(doctors).status(200);
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router;
