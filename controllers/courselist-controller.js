const express = require('express');
const router = express.Router();
const BadRequestError = require('../errors/bad-request');
const generator = require('../utils/uuid-generator');
const {find} = require('lodash');

const db = require('../data/db');
const courseListCollection = db.courseList;

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

router.get('/', (req, res) => {
    res.status(200).json({
        data: db.courseList
    })
});

module.exports = router;