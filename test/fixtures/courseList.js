const {courseList} = require('../../data/db');
const UUID = require('../../utils/uuid-generator');

const mockData = [
    {id: UUID.generate(), name: 'Auchan'},
    {id: UUID.generate(), name: 'Casino'}
];

module.exports = {
    up: () => {
        courseList.splice(0);
        courseList.push.apply(courseList, mockData);
        return courseList;
    },

    down: () => {
        courseList.splice(0)
    }
};