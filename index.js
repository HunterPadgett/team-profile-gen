// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

const fs = require('fs');
const inquirer = require('inquirer');
// const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

function teamManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'manName',
      message: 'What is the team manager\'s name?',
    },
    {
      type: 'input',
      name: 'manId',
      message: 'What is the team manger\'s id?',
    },
    {
      type: 'input',
      name: 'manEmail',
      message: "What is the team manger\'s email?",
    },
    {
      type: 'input',
      name: 'manOfficeNum',
      message: 'What is the team manger\'s office number?',
    },
  ]).then(manAnswers => {
    manager = new Manager(manAnswers.manName, manAnswers.manId, manAnswers.manEmail, manAnswers.manOfficeNum);
    // console.log(manager)
    nextQuestion();
  });
}

function nextQuestion() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'member',
      message: 'Which type of team member would you like to add?',
      choices: ["Engineer", "Intern", "I don't want to add any more team members"],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is their name?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their id?',
    },
    {
      type: 'input',
      name: 'email',
      message: "What is their email?",
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is their github?',
      when: (role) => role.member === 'Engineer'
    },
    {
      type: 'input',
      name: 'school',
      message: "What school did they attend?",
      when: (role) => role.member === 'Intern'
    },
    {
      type: 'list',
      name: 'anotherOne',
      message: "Would you like to add another member?",
      choices: ["Yes", "No"]
    },
  ]).then(answers => {
    
      if (answers.member === 'Engineer') {
        engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        console.log(engineer)
        nextQuestion();
        
      } else if (answers.member === 'Intern') {
        intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        console.log(intern)
        nextQuestion();
        
      } else if (answers.anotherOne === "Yes") {
        console.log('run it back')
        nextQuestion();  

      } else {
        console.log('no mas')
      }
  });
};

const makeHTML = ({member, id, name, github, school, email, manName, manId, manEmail, manOfficeNum}) =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid p-3" style="background-color: red; color: white;">
    <div class="container">
      <h2 class="display-5 text-center">My Team</h2>
    </div>
  </div>

  <div class="d-flex flex-wrap justify-content-around mt-3">
    <div class="card m-5 shadow" style="width: 25rem;">
      <div class="bg-primary text-white" >
        <h5 class="card-title m-2">${manName}</h5>
        <h5 class="card-text m-2">Manager</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${manId}</li>
        <li class="list-group-item">${manEmail}</li>
        <li class="list-group-item">${manOfficeNum}</li>
      </ul>
    </div>

    <div class="card m-5 shadow" style="width: 25rem;">
      <div class="bg-primary text-white" >
        <h5 class="card-title m-2">name </h5>
        <h5 class="card-text m-2">job title</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>

    <div class="card m-5 shadow" style="width: 25rem;">
      <div class="bg-primary text-white" >
        <h5 class="card-title m-2">name </h5>
        <h5 class="card-text m-2">job title</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>

    <div class="card m-5 shadow" style="width: 25rem;">
      <div class="bg-primary text-white" >
        <h5 class="card-title m-2">name </h5>
        <h5 class="card-text m-2">job title</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>

    <div class="card m-5 shadow" style="width: 25rem;">
      <div class="bg-primary text-white" >
        <h5 class="card-title m-2">name </h5>
        <h5 class="card-text m-2">job title</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>
  </div>

</body>
</html>`;

// const init = () => {
//   teamManager()
//     .then((answers) => fs.writeFileSync('index.html', makeHTML(answers)))
//     .then(() => console.log('Successfully wrote to index.html'))
//     .catch((err) => console.error(err));
// };


teamManager();
// init();
