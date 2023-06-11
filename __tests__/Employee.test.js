const Employee = require('../lib/Employee');

describe('Employee', () => {
    describe('getName', () => {
        it('should return employee name', () => {
            const employee = new Employee ('Mike Jackson', 1985, 'mike@iowa.com');

            expect(employee.getName()).toEqual(expect.any(String));
        })
    })

    describe('getId', () => {
        it('should return employee ID', () => {
            const employee = new Employee ('Mike Jackson', 1985, 'mike@iowa.com');

            expect(employee.getId()).toEqual(expect.any(Number));
        })
    })

    describe('getEmail', () => {
        it("should return employee email", () => {
            const employee = new Employee('Mike Jackson', 1985, 'mike@iowa.com');

            expect(employee.getEmail()).toEqual(expect.any(String));
        })
    })

    describe('getRole', () => {
        it("should return employee as the role", () => {
            const employee = new Employee('Mike Jackson', 1985, 'mike@iowa.com');

            expect(employee.getRole()).toEqual('Employee');
        })
    })
})
