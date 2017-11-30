require('chai').should();
const generator = require('../../utils/uuid-generator');

describe('UUID-generator', () => {
    describe('when generating', () => {
        it('should return a random UUID', () => {
            let uuid = generator.generate();
            const regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', 'i');
            regex.test(uuid).should.be.true;
        })
    })
});