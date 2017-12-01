const express = require('express');
const router = express.Router();
const BadRequestError = require('../errors/bad-request');
const generator = require('../utils/uuid-generator');
const {find} = require('lodash');

const db = require('../data/db');
let courseListCollection = db.courseList;

const articleListRouter = require('./articlelist-controller');


router.get('/', (req, res) => {
    res.status(200).json({
        data: db.courseList
    })
});

router.post('/', (req, res, next) => {
    if (!req.body.name) {
        return next(new BadRequestError('VALIDATION', 'Missing name'))
    }

    const name = req.body.name;

    // Check for name uniqueness
    const result = find(courseListCollection, {name});
    if (result) {
        return next(new BadRequestError('VALIDATION', 'Name should be unique'))
    }

    const newCourseList = {
        id: generator.generate(),
        name
    };

    courseListCollection.push(newCourseList);
    res.status(201).json({
        data: newCourseList
    })
});

router.delete('/:listId', (req, res, next) => {

    const id = req.params.listId;

    //Check for list existence
    const elToRemove = find(courseListCollection, {id});
    if (!elToRemove) {
        return next(new BadRequestError('VALIDATION', 'List does not exist'))
    }

    courseListCollection = courseListCollection.filter(el => el.id !== elToRemove.id);
    res.status(200).json({
        data: courseListCollection
    })
});

router.use('/:listId/articles', articleListRouter);

module.exports = router;