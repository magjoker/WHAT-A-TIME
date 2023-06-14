const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
    describe('getRole', () => {
        it('should return engineer as role', () => {
            const engineer = new Engineer ('Mike Jackson', 1985, 'mike@iowa.com', 'jacksondev');

            expect(engineer.getRole()).toEqual("Engineer")
        })
    })
})
