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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Task.findById(id)
        .then(response => res.json(response))
        .catch(error => res.json({ status: 422, error: error }));
});

router.post('/', (req, res) => {
    const taskNew = new Task(req.body);
    taskNew.save()
        .then(response => res.json({ status: 201 }))
        .catch(error => res.json({ status: 422, error: error }));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndUpdate(id, req.body)
        .then(response => res.json({ status: 200 }))
        .catch(error => res.json({ status: 422, error: error }));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id, req.body)
        .then(response => res.json({ status: 200 }))
        .catch(error => res.json({ status: 422, error: error }));
});

module.exports = router;
