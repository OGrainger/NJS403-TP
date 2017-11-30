const express = require('express');
const router = express.Router();
const BadRequestError = require('../errors/bad-request');
const generator = require('../utils/uuid-generator');
const {find} = require('lodash');

const db = require('../data/db');
const courseListCollection = db.courseList;
const articleListCollection = db.articleList;

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

router.post('/:listId/article', (req, res, next) => {
    if (!req.body.name) {
        return next(new BadRequestError('VALIDATION', 'Missing name'))
    }

    const name = req.body.name;
    const listId = req.params.listId;

    //Check for list existence
    const listChecker = find(courseListCollection, {id: listId});
    if (!listChecker) {
        return next(new BadRequestError('VALIDATION', 'List does not exist'))
    }


    // Check for name uniqueness
    const articleChecker = find(articleListCollection, {name, list: listId});
    if (articleChecker) {
        return next(new BadRequestError('VALIDATION', 'Name should be unique'))
    }

    const newArticle = {
        id: generator.generate(),
        name,
        list: listId
    };

    articleListCollection.push(newArticle);
    res.status(201).json({
        data: newArticle
    })
});

module.exports = router;