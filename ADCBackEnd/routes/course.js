const express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
let sequelize= models.sequelize
const { Op } = require("sequelize");
const { checkTokenValidity } = require('../services/auth');
router.get('/search/:search',async (req,res)=>{
    try {
      let userdb = await models.course.findAll({where:{title:{[Op.like]:`%${req.params.search}%`}}});
      res.send(userdb).status(200);
    } catch (error) {
      console.log(error);
    }
  })
router.post('/', async function (req, res, next) {
    try {
        await models.course.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.get('/type/:type',checkTokenValidity, async (req, res, next) => {
    console.log(req.params.type)
    try {
        let token = req.headers['x-auth-token'];
        var decoded = jwt.verify(token, 'WizzardOz');
        let courses = await models.course.findAll({
            where:{type:req.params.type 
        },
            include:{all:true},raw:true});
          console.log(courses[1])
        let doctors = await models.Doctor.findAll({attributes:[['name','label'],['id','value']]});
        let officers = await models.Officer.findAll({attributes:[['name','label'],['id','value']]});
        let tassistants = await models.TAssistant.findAll({attributes:[['name','label'],['id','value']]});    
        res.send({courses,doctors,officers,tassistants}).status(200);
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',checkTokenValidity,async(req,res,next)=>{
    const id = req.params.id;
    console.log(id);
    try {
        let course = await models.course.findOne({
          where:{id},
          include:{all:true}});
        let enrollmentNumber = await models.student.count({where:{
            year:course.dataValues.year,
            type:course.dataValues.type
        }})
        let coursetotalStatus  = await models.studentAttendance.findAll({
            where:{courseId:course.dataValues.id},
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]
        })
        let studentResponse = await models.studentRating.findAll({
            where:{courseId:course.dataValues.id},
            attributes: ['rate', [sequelize.fn('count', sequelize.col('rate')), 'count']],
            group: ['rate'],
            order:[['rate','ASC']]
        })
        let LecStatus = await models.studentAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"محاضرة"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        let SecStatus = await models.studentAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"تمرين"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        let LabStatus = await models.studentAttendance.findAll({
            where:{
                courseId:course.dataValues.id,
                type:"معمل"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order:[['status','ASC']]

        })
        res.send({studentResponse,LecStatus,SecStatus,LabStatus,course,enrollmentNumber,coursetotalStatus}).status(200)
    } catch (error){
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
