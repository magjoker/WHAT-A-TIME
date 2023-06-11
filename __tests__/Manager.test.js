const Manager = require('../lib/Manager');

describe('Manager', () => {
    describe('getRole', () => {
        it('should return manager as role', () => {
            const manager = new Manager ('Mike Jackson', 1985, 'mike@iowa.com', 40);

            expect(manager.getRole()).toEqual("Manager")
        })
    })
})
