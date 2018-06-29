const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(user => {
            res.status(200).json(user);
        });
});

router.get('/:id', (req, res) => {
    User 
        .findById( req.params.id )
        .then( user => {
            if(user) {
                return res.status(200).json(user)
            } else {res.status(404).send('Id not on file!')}
        })
});

router.post('/', (req, res) => {
    const user = new User (req.body)
    user
        .save()
        .then(user => {
            res.status(201).json(user);
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(user => {
        res.status(204).json(user);
    });
});

router.delete('/:id', (req, res) => {
    if (req.params.id) {
    User
        .findByIdAndRemove(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
    }
});

module.exports = router;