const express = require('express');
var router = express.Router();
var models=require('../models');
let student = models.student
var jwt = require('jsonwebtoken');
let sequelize = models.sequelize
const { Op } = require("sequelize");
const { checkTokenValidity } = require('../services/auth');

router.post('/',async function(req,res,next){
  try {
        let userdb = await student.create(req.body.data);
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.post('/punishment',async function(req,res,next){
  try {
        let userdb = await models.punishment.create(req.body.data);
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.put('/punishment',async function(req,res,next){
  try {
        await models.punishment.update(req.body.data,{where:{id:req.body.data.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.delete('/punishment/:id',async function(req,res,next){
  try {
        await models.punishment.destroy({where:{id:req.params.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});

router.post('/failedCourses',async function(req,res,next){
  try {
        let userdb = await models.failedCourse.create(req.body.data);
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.put('/failedCourses',async function(req,res,next){
  try {
        await models.failedCourse.update(req.body.data,{where:{id:req.body.data.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.delete('/failedCourses/:id',async function(req,res,next){
  try {
        await models.failedCourse.destroy({where:{id:req.params.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.post('/specialization',async function(req,res,next){
  try {
    console.log(req.body.data)
       await models.student.update({specialization:req.body.data.specialization},{where:{id:req.body.data.studentId}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});

router.put('/specialization',async function(req,res,next){
  try {
    console.log(req.body.data)
       let userdb = await models.student.update({specialization:req.body.data.specialization},{where:{id:req.body.data.studentId}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.post('/labsBenefits',async function(req,res,next){
  try {
        let userdb = await models.labsBenefit.create(req.body.data);
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.put('/labsBenefits',async function(req,res,next){
  try {
        await models.labsBenefit.update(req.body.data,{where:{id:req.body.data.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.delete('/labsBenefits/:id',async function(req,res,next){
  try {
        await models.labsBenefit.destroy({where:{id:req.params.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});



router.post('/rating',async function(req,res,next){
  try {
        let userdb = await models.studentRating.create(req.body.data);
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.get('/rating/:id/:weekno',async function(req,res,next){
  try {
        let weeklyRating = await models.studentRating.findAll({where:{weekno:req.params.weekno,studentId:req.params.id},
          include:[
            {model:models.course,as:"course",foreignKey:"courseId",attributes:[['title','label'],['id','value'],'code']},
        ]
        });
        res.send(weeklyRating).status(200);
  } catch (error) {
      console.log(error);
  }
});
router.put('/rating',async function(req,res,next){
  try {
        await models.studentRating.update(req.body.data,{where:{id:req.body.data.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.delete('/rating/:id',async function(req,res,next){
  try {
        await models.studentRating.destroy({where:{id:req.params.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});

router.get('/search/:search',async (req,res)=>{
  try {
    console.log(req.params.search)
    let userdb = await student.findAll({where:{name:{[Op.like]:`%${req.params.search}%`}}});
    res.send(userdb).status(200);
  } catch (error) {
    console.log(error);
  }
})

router.post('/attendance',async function(req,res,next){
  try {
        let userdb = await models.studentAttendance.create(req.body.data);
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.get('/attendance/:id/:weekno',async function(req,res,next){
  try {
        let weeklyRating = await models.studentAttendance.findAll({where:{weekno:req.params.weekno,studentId:req.params.id},
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
        await models.studentAttendance.update(req.body.data,{where:{id:req.body.data.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
router.delete('/attendance/:id',async function(req,res,next){
  try {
        await models.studentAttendance.destroy({where:{id:req.params.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});



router.get('/', checkTokenValidity,async (req,res,next)=>{
  try {
    
  let   students = await student.findAll();
    res.send(students).status(200);
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req,res,next)=>{
  const id = req.params.id
  try {
    let students = await student.findOne({
      where:{id:id}
    });
    console.log(students.dataValues.year)
    let courses  = await models.course.findAll({where:{year:students.dataValues.year},include:[
      {model:models.Doctor,as:"Doctor",foreignKey:"doctorId",attributes:[['name','label'],['id','value']]},
         {model:models.Officer,as:"Officer",foreignKey:"OfficerId",attributes:[['name','label'],['id','value']]},
         {model:models.TAssistant,as:"TAssistant",foreignKey:"TAssistantId",attributes:[['name','label'],['id','value']]},       
    ]})

    let FailedCourses = await models.failedCourse.findAll({where:{studentId:id}})
    let Punishments = await models.punishment.findAll({where:{studentId:id}})
    let LabsBenefits = await models.labsBenefit.findAll({where:{studentId:id}, include:[
         {model:models.Doctor,as:"Doctor",foreignKey:"doctorId",attributes:[['name','label'],['id','value']]},
         {model:models.Officer,as:"Officer",foreignKey:"OfficerId",attributes:[['name','label'],['id','value']]},
         {model:models.TAssistant,as:"TAssistant",foreignKey:"TAssistantId",attributes:[['name','label'],['id','value']]},
       ]})
    let doctors = await models.Doctor.findAll({attributes:[['name','label'],['id','value']]});
    let officers = await models.Officer.findAll({attributes:[['name','label'],['id','value']]});
    let tassistants = await models.TAssistant.findAll({attributes:[['name','label'],['id','value']]});
    let studentRating  = await models.studentRating.findAll({
      where:{studentId:id},
      attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
      group: ['weekno'],
  })
  let attendance  = await models.studentAttendance.findAll({
    where:{studentId:id},
    attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
    group: ['weekno'],
})
    res.send({studentAttendance:attendance,studentRating,tassistants,doctors,officers,courses,student:students,failedCourses:FailedCourses,punishment:Punishments,labsBenefits:LabsBenefits}).status(200);
  } catch (error) {
    console.log(error)

  }
})
router.put("/:id",async (req,res,next)=>{
  try {
    console.log(req.body.data)
     await student.update(
      {
        name:req.body.data.name,
        militaryId:req.body.data.militaryId,
        group:req.body.data.group,
        section :req.body.data.section,
        unit: req.body.data.unit,
        town:req.body.data.town,
        country:req.body.data.country,
        type:req.body.data.type,
        email:req.body.data.email,
        year:req.body.data.year,
        collegeDegree:req.body.data.collegeDegree,
        prevTermDegree:req.body.data.prevTermDegree,
        prevTermweekestDegree:req.body.data.prevTermweekestDegree
      }
    ,{where:{id:req.params.id}})
    let students = await student.findOne({
      where:{id:req.params.id}
    });
    res.send(students).status(200);
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
