const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const { response } = require('express');

router.get('/', (req, res) => {
    Task.find()
        .then(response => {
            // console.log('Task', response);
            res.json(response);
        });
});

module.exports = router;
