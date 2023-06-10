const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const { createDocument } = require('./document');

class teamTemplate {
    constructor() {
        this.title = '';
        this.squad = [];
    }
    run() {
        return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the Managers name',
            },
        ])
        .then(({ name }) => {
            this.title = `${name}'s Team`;
            return this.addEmployee();
            
        })
        .then(() => {
            return writeFile(
            join(__dirname, '..', 'output', 'team.html'),
            createDocument(this.title, this.squad)
            );
        })
        .then(() => console.log('Created team.html'))
        .catch((err) => {
            console.log(err);
            console.log('Oops. AI has taken over and we have all been.');
        });
    }
    addEmployee() {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "Enter employee's role",
                    choices: [
                        'Engineer',
                        'Intern'
                    ]
                },
                {   
                    type: 'input',
                    name: 'name',
                    message: "Enter employee's name?"
                },
                {
                    type: 'input',
                    name: 'id',
                    message: "Enter employee's ID?"
                },
                {
                    type: 'input',
                    name: 'email',
                    message: "Enter employee's email?"
                },
                {
                    type: 'input',
                    name: 'github',
                    message: "Enter employee's github? (Engineers Only)"
                },
                {
                    type: 'input',
                    name: 'school',
                    message: "Enter employee's school? (Interns Only)"
                },
                {
                    type: 'confirm',
                    name: 'oneMoreEmployee',
                    message: 'Would you like to add another task?',
                },
            ])
            .then(({ role, name, id, email, github, school, oneMoreEmployee }) => {
                this.squad.push({ role, name, id, email, github, school });
                if (oneMoreEmployee) {
                    return this.addEmployee();
                }
            });
    }
}

module.exports = teamTemplate;