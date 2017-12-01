const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
chai.should();


const {find} = require('lodash');

const db = require('../../data/db');
const app = require('../../app');

const courseListFixture = require('../fixtures/courseList');

beforeEach(() => {
    courseListFixture.up();
});
afterEach(() => {
    courseListFixture.down();
});

describe('CourseListController', () => {

    describe('When I create a courseList (POST /course-lists)', () => {
        it('should reject with a 400 when no name is given', () => {
            return request(app).post('/course-lists').then((res) => {
                res.status.should.equal(400);
                res.body.should.eql({
                    error: {
                        code: 'VALIDATION',
                        message: 'Missing name'
                    }
                })
            })
        });

        it('should reject when name is not unique', () => {
            return request(app)
                .post('/course-lists')
                .send({name: 'Auchan'})
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
            const mockName = 'My New List';

            return request(app)
                .post('/course-lists')
                .send({name: mockName})
                .then((res) => {
                    res.status.should.equal(201);
                    expect(res.body.data).to.be.an('object');
                    res.body.data.name.should.equal(mockName);

                    const result = find(db.courseList, {name: mockName});
                    result.should.not.be.empty;
                    result.should.eql({
                        id: res.body.data.id,
                        name: res.body.data.name
                    })
                })
        })
    });

    describe('When I fetch all courseLists (GET /course-lists)', () => {

        it('should successfully fetch all courseLists', () => {
            return request(app)
                .get('/course-lists')
                .then((res) => {
                    res.status.should.equal(200);
                    expect(res.body.data).to.be.an('Array');
                    res.body.data.should.eql(db.courseList);
                })
        });
    });

    describe('When I remove a courseList (DELETE /course-lists/id)', () => {
        it('should delete successfully when id exists', () => {
            const listId = db.courseList[0].id;

            return request(app)
                .delete('/course-lists/' + listId)
                .then((res) => {
                    res.status.should.equal(200);
                    expect(res.body.data).to.be.an('Array');
                    const resultLength = res.body.data.length;
                    resultLength.should.equal(1);
                });
        });

        it('should reject when id does not exist', () => {
            const listId = 'foo';

            return request(app)
                .delete('/course-lists/' + listId)
                .then((res) => {
                    res.status.should.equal(400);
                    res.body.should.eql({
                        error: {
                            code: 'VALIDATION',
                            message: 'List does not exist'
                        }
                    })
                })


        })
    });
});
