const {courseList} = require('../../data/db');
const UUID = require('../../utils/uuid-generator');

const mockData = [
    {id: UUID.generate(), name: 'Auchan'},
    {id: UUID.generate(), name: 'Casino'}
];

module.exports = {
    up: () => {
        [].push.apply(courseList, mockData);
        return courseList;
    },

    down: () => {
        courseList.splice(0)
    }
};