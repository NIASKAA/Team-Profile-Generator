const inquirer = require('inquirer');
const fs = require('fs');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');

const employees = [];

function generateHtml(){
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
        <link rel="stylesheet" href="/assets/css/style.css">
        <title>Team Profile Generator</title>
    </head>
    <body>
    <nav class="navbar is-link" role="navigation" aria-label="main-navigation">
        <div>
            <a class="navbar-item">
                Team Profile Generator
            </a>
        </div>
    </nav>`;

    fs.writeFile('index.html', html, function(err) {
        if(err) {
            console.log(err);
        } 
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            message: "Enter name:",
            name: "name",
        },
        {   
            message: "Member's ID?",
            name: "id",
        },
        {
            message: "What is the team member's role?",
            type: "list",
            choices: [
                "Intern",
                "Manager",
                "Engineer",
            ],
            name: "role",
        },
        {
            message: "What is team member's email?",
            name: "email",
        },

    ]).then(function ({name, id, email, role}) {
        let moreRoleInfo = "";
        if(role === "Engineer"){
            moreRoleInfo = "Github Username";
        } else if(role === "Intern"){
            moreRoleInfo = "School name";
        } else {
            moreRoleInfo = "Office Phone Number"
        }
        inquirer.prompt([
            {
                message: "Enter Team Member's ${moreRoleInfo}",
                name: "moreRoleInfo",
            },
            {
                message: "Add more members?",
                type: "list",
                choices: [
                    "Yes",
                    "No",
                ],
                name: "addMembers",
            },

        ]).then(function({addMembers, moreRoleInfo}) {
            let newMember; 
            if (role === "Engineer"){
                newMember =  new Engineer(name, id, email, moreRoleInfo);
            } else if (role === "Intern"){
                newMember = new Intern(name, id, email, moreRoleInfo);
            } else {
                newMember = new Manager(name, id, email, moreRoleInfo);
            } 
            employees.push(newMember);
            newHtmlMember(newMember)
            .then(function() {
                if(addMembers === "Yes") {
                    addEmployee();
                } else {
                    closeHtml();
                }
            });
        });
    });

}

function newHtmlMember(member) {
    return new Promise(function(resolve, reject) {
        const role = member.getRole();
        const name = member.getName();
        const id = member.getID();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const github = member.getGithub();
            
            data = 
            `
            <section class="container">
            <div class="content">
                <table class="table is-bordered">
                    <thread class="titleHeader">
                        <tr class="cardTitle"> 
                            <th class="has-text-white>Engineer</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>
                                Name: ${name}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                ID: ${id}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                Email: ${email}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                Github Username: ${github}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>`;

        } else if (role === "Intern") {
            const school = member.getSchool();
            
            data = 
            `
            <section class="container">
            <div class="content">
                <table class="table is-bordered">
                    <thread class="titleHeader">
                        <tr class="cardTitle1"> 
                            <th class="has-text-white>Intern</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td> 
                                Name: ${name} 
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                ID: ${id}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                Email: ${email}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                School: ${school}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>`;

        } else {
            const officePhoneNum  = member.getOfficeNum();
            data = 
            `
            <section class="container">
            <div class="content">
                <table class="table is-bordered">
                    <thread class="titleHeader">
                        <tr class="cardTitle2"> 
                            <th class="has-text-white>Manager</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>
                                Name: ${name}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                ID: ${id}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                Email: ${email}
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                Office Phone Number: ${officePhoneNum}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>`;
        }
        fs.appendFile("index.html", data, function(err) {
            if(err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function closeHtml (){
    let html = 
    `
</body>
</html>`;
    fs.appendFile("./index.html", html, function(err) {
        if(err) {
            console.log(err);
        };
    });
    console.log("Completed HTML")
} 

generateHtml();
addEmployee();