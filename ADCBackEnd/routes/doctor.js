const express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/', async function (req, res, next) {
    try {
        await models.Doctor.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let Doctors = await models.Doctor.findAll();
        res.send(Doctors).status(200);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
