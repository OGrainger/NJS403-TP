const express = require('express');
const router = express.Router({mergeParams: true});
const BadRequestError = require('../errors/bad-request');
const generator = require('../utils/uuid-generator');
const {find} = require('lodash');

const db = require('../data/db');
let courseListCollection = db.courseList;
let articleListCollection = db.articleList;

router.post('/', (req, res, next) => {
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

router.put('/:articleId/bought', (req, res, next) => {

    const articleId = req.params.articleId;
    const listId = req.params.listId;

    //Check for list existence
    const listChecker = find(courseListCollection, {id: listId});
    if (!listChecker) {
        return next(new BadRequestError('VALIDATION', 'List does not exist'))
    }

    //Check for list existence
    const articleChecker = find(articleListCollection, {id: articleId});
    if (!articleChecker) {
        return next(new BadRequestError('VALIDATION', 'Article does not exist'))
    }
    let returnedArticle = articleChecker;

    articleListCollection = articleListCollection.map(article => {
        if (article.id === articleId) {
            article.bought = !article.bought;
            returnedArticle = article;
        }
    });
    res.status(201).json({
        data: returnedArticle
    })
});

module.exports = router;