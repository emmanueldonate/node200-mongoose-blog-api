const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where('featured', true)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogs => {
            if (blogs) {
                return res.status(200).json(blogs)
            } else { res.status(404).send('Id is not on file!')}
        });
});

router.post('/', (req, res) => {
    let dbUser = null;
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;

            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        });
});

router.put('/:id', (req, res) => {
    Blog 
        .findByIdAndUpdate(req.params.id, req.body)
        .then(blogs => {
        res.status(204).json(blogs);
    });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blogs => {
            if (req.params.id) {
            res.status(200).json(blogs);
            }
        });
});

module.exports = router;