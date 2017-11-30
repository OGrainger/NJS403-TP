const {articleList} = require('../../data/db');
const UUID = require('../../utils/uuid-generator');


module.exports = {
    up: (courseList) => {
        const mockData = [
            {id: UUID.generate(), name: 'Apples', list: courseList[0].id},
            {id: UUID.generate(), name: 'Oranges', list: courseList[0].id},
            {id: UUID.generate(), name: 'Pineapples', list: courseList[1].id}
        ];

        articleList.splice(0);
        articleList.push.apply(articleList, mockData);
    },

    down: () => {
        articleList.splice(0)
    }
};