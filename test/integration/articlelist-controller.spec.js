const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
chai.should();


const {find} = require('lodash');

const db = require('../../data/db');
const app = require('../../app');

const courseListFixture = require('../fixtures/courseList');
const articleListFixture = require('../fixtures/articleList');

beforeEach(() => {
    let courseList = courseListFixture.up();
    articleListFixture.up(courseList);
});
afterEach(() => {
    courseListFixture.down();
    articleListFixture.down();
});

describe('ArticleListController', () => {

    describe('When I add an article (POST /course-lists/:listId/article)', () => {
        it('should reject with a 400 when no name is given', () => {
            const id = db.courseList[1].id;
            return request(app).post('/course-lists/' + id + '/article').then((res) => {
                res.status.should.equal(400);
                res.body.should.eql({
                    error: {
                        code: 'VALIDATION',
                        message: 'Missing name'
                    }
                })
            })
        });

        it('should reject with a 400 when list does not exist', () => {
            const id = 'foo';
            return request(app)
                .post('/course-lists/' + id + '/article')
                .send({name: 'Pineapples'})
                .then((res) => {
                    res.status.should.equal(400);
                    res.body.should.eql({
                        error: {
                            code: 'VALIDATION',
                            message: 'List does not exist'
                        }
                    })
                })
        });

        it('should reject when name is not unique', () => {
            const id = db.courseList[1].id;
            return request(app)
                .post('/course-lists/' + id + '/article')
                .send({name: 'Pineapples'})
                .then((res) => {
                    res.status.should.equal(400);
                    res.body.should.eql({
                        error: {
                            code: 'VALIDATION',
                            message: 'Name should be unique'
                        }
                    })
                })
        });


        it('should successfully create a courseList', () => {
            const mockName = 'Bananas';
            const listId = db.courseList[1].id;

            return request(app)
                .post('/course-lists/' + listId + '/article')
                .send({name: mockName})
                .then((res) => {
                    res.status.should.equal(201);
                    expect(res.body.data).to.be.an('object');
                    res.body.data.name.should.equal(mockName);

                    const result = find(db.articleList, {name: mockName, list: listId});
                    result.should.not.be.empty;
                    result.should.eql({
                        id: res.body.data.id,
                        name: res.body.data.name,
                        list: res.body.data.list
                    })
                })
        })
    });

    describe('When I want to label an article as bought (POST /course-lists/:listId/article/:articleId/bought', () => {

        it('should reject with a 400 when list does not exist', () => {
            const listId = 'foo';
            const articleId = db.articleList[0].id;
            return request(app)
                .put('/course-lists/' + listId + '/article/' + articleId + '/bought')
                .then((res) => {
                    res.status.should.equal(400);
                    res.body.should.eql({
                        error: {
                            code: 'VALIDATION',
                            message: 'List does not exist'
                        }
                    })
                })
        });

        it('should reject with a 400 when article does not exist', () => {
            const listId = db.courseList[0].id;
            const articleId = 'foo';
            return request(app)
                .put('/course-lists/' + listId + '/article/' + articleId + '/bought')
                .then((res) => {
                    res.status.should.equal(400);
                    res.body.should.eql({
                        error: {
                            code: 'VALIDATION',
                            message: 'Article does not exist'
                        }
                    })
                })
        });


        it('should successfully label an article as \'bought\'', () => {
            const listId = db.courseList[0].id;
            const articleId = db.articleList[0].id;

            return request(app)
                .put('/course-lists/' + listId + '/article/' + articleId + '/bought')
                .then((res) => {
                    res.status.should.equal(201);
                    expect(res.body.data).to.be.an('object');
                    res.body.data.id.should.equal(articleId);

                    const result = find(db.articleList, {id: articleId});
                    result.should.not.be.empty;
                    result.should.eql({
                        id: res.body.data.id,
                        name: res.body.data.name,
                        list: res.body.data.list,
                        bought: true
                    })
                })
        })
    describe('When I fetch all alticleList (GET /course-lists/:courseListId/article)', () => {
        it('should successfully fetch all articleLists', () => {
            const listId = req.param.listId;
            return request(app)
                .get('/course-list/' + listId + '/article')
                .then((res) => {
                    res.status.should.equal(200);
                    expect(res.body.data).to.be.an('Array');
                    res.body.data.should.eql(db.articleList.filter(article => article.list === listId));
                });
        });
    })
});
