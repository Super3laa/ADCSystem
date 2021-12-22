const express = require('express');
var router = express.Router();
var models=require('../models');

router.post('/', async function (req, res, next) {
    try {
        await models.Officer.create(req.body.data);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let Officers = await models.Officer.findAll();
        res.send(Officers).status(200);
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;
