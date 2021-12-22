const express = require('express');
var router = express.Router();
var models=require('../models');


router.post('/', async function (req, res, next) {
    try {
        await models.TAssistant.create(req.body.data);
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
module.exports = router;
