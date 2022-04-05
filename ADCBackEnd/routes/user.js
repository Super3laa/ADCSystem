const express = require('express');
var router = express.Router();
let auth = require('../services/auth.js');
var models = require('../models');
const { Op } = require("sequelize");
var fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node');
const { checkTokenValidity } = require('../services/auth.js');
const { seedDataBase ,seedExcelSheets} = require('../services/ExcelSync.js');

router.get('/search/:search',checkTokenValidity, async (req, res) => {
  try {
    let userdb = await models.user.findAll({ where: { username: { [Op.like]: `%${req.params.search}%` } } });
    res.send(userdb).status(200);
  } catch (error) {
    console.log(error);
  }
})
router.post('/getUser',checkTokenValidity, async function (req, res, next) {
  try {
    console.log(req.body.data)

    let userdb = await models.user.findOne({
      attributes: ["id", "username", "permissions", "type"],
      where: { id: req.body.data.id }
    })
    if (userdb) {
       res.status(200).send(userdb);
    }else{
      res.status(403).send("permission denied")
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/login', async function (req, res, next) {
  //chk pass send jwt
  try {
    let userDB = await auth.checkLoginData(req, res);
    if (userDB) {
      let token = await auth.giveMeLoginToken(userDB);
      res.status(200).json({ token });
    } else {
      res.status(301).send("Wrong Username or Passwrord")
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/', checkTokenValidity,async function (req, res, next) {
  try {
    await models.user.create(req.body.data);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});
router.get('/sync/:sync', checkTokenValidity,async function (req, res, next) {
  try {
    switch (req.params.sync) {
      case "EDB":
        await seedDataBase();
        break;
      case"DBE":
        await seedExcelSheets();
        break;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



router.get('/', async (req, res, next) => {
  try {
    let Officers = await models.user.findAll({
      attributes:['id','username','permissions','type']
    }
    );
    res.send(Officers).status(200);
  } catch (error) {
    console.log(error)
  }
})


router.put('/',checkTokenValidity,async function(req,res,next){
  const salt=bcrypt.genSaltSync();
  try {
    req.body.data.password = await bcrypt.hashSync(req.body.data.password,salt);
    await models.user.update(req.body.data,{where:{id:req.body.data.id}});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

});
router.delete('/:id',checkTokenValidity,async function(req,res,next){
  try {
        await models.user.destroy({where:{id:req.params.id}});
        res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
