const Intern = require('../lib/Intern');

describe('Intern', () => {
    describe('getRole', () => {
        it('should return intern as role', () => {
            const intern = new Intern ('Mike Jackson', 1985, 'mike@iowa.com', 'UVU');

            expect(intern.getRole()).toEqual("Intern")
        })
    })
});
