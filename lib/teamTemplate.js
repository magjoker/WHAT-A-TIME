const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const Manager = require('../lib/Manager');
// const { createDocument } = require('./document.js');

const renderH1 = (manager) => `
<p>
    You've got a great team${manager.name}!
</p>
`

const renderMan = (manager) => `
<div class="employeeCard">
    ${manager.name} 
    ${manager.id}
</div>
`

const renderEngineer = (engineer) => `
<div class="employeeCard">
    ${engineer.name} 
    ${engineer.id}
</div>
`
const renderIntern = (intern) => `
<div class="employeeCard">
    ${intern.name} 
    ${intern.id}
</div>
`
function createDocument(title, squad = []) {
console.log(squad);
console.log(squad[0].name);
const manHTML = squad.map(renderMan).join("\n")
const engineerHTML = squad.filter(employee => employee.role === "Engineer").map(renderEngineer).join("\n")
const internHTML = squad.filter(employee => employee.role === "Intern").map(renderIntern).join("\n")
const h1HTML = squad.filter(employee => employee.role === "Manager").map(renderH1).join("\n")
    // let employeeCard = squad.render();
    
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${title}</title>
        <link rel="stylesheet" href="../dist/style.css" />
        </head>
        <body>
            <div class="page-title">${h1HTML}</div>
            <div class="team-card">${manHTML}</div>
            <div class="team-card">${engineerHTML}</div>
            <div class="team-card">${internHTML}</div>
        </body>
    </html>
    `;
}
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
                message: 'Please enter the Managers Name',
            },
            {
                type: 'input',
                name: 'id',
                message: 'Please enter the Managers Id',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter the Managers Email',
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Please enter the Managers Office Number',
            },
        ])
        // .then(({ name }) => {
        //     this.title = `${name}'s Team`;
        //     return this.addEmployee();
            
        // })
        .then(managerInfo => {
            const {name, id, email, officeNumber} = managerInfo;
            const manager = new Manager (name, id, email, officeNumber);
            this.squad.push(manager);
            console.log(manager);
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
            console.log('Oops. AI has taken over and we all have been.');
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
                    message: 'Would you like to add another employee?',
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