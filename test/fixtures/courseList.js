const { courseList } = require('../../data/db');
const UUID = require('../../utils/uuid-generator');

const mockData = [
  { id: UUID.generate(), name: 'Toto' },
  { id: UUID.generate(), name: 'Ma liste' }
];

module.exports = {
  up: () => {
    courseList.splice(0);
    courseList.push.apply(courseList, mockData)
  },

  down: () => {
    courseList.splice(0)
  }
};