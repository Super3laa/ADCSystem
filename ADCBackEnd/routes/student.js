const express = require('express');
var router = express.Router();
var models=require('../models');
let student = models.student
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


router.get('/', async (req,res,next)=>{
  try {
    let students = await student.findAll();
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

    let FailedCourses = await models.failedCourse.findAll({where:{studentId:id}})
    let Punishments = await models.punishment.findAll({where:{studentId:id}})
    let LabsBenefits = await models.labsBenefit.findAll({where:{studentId:id}})

    res.send({student:students,failedCourses:FailedCourses,punishment:Punishments,labsBenefits:LabsBenefits}).status(200);
  } catch (error) {
    console.log(error)

  }
})
router.put("/:id",async (req,res,nect)=>{
  try {
     await student.update(
      req.body.data 
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