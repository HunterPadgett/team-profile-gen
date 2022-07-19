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
const InputPrompt = require('inquirer/lib/prompts/input');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let employees = [];

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
      message: 'What is the team manager\'s id?',
    },
    {
      type: 'input',
      name: 'manEmail',
      message: "What is the team manager\'s email?",
    },
    {
      type: 'input',
      name: 'manOfficeNum',
      message: 'What is the team manager\'s office number?',
    },
  ]).then(manAnswers => {
    const manager = new Manager(manAnswers.manName, manAnswers.manId, manAnswers.manEmail, manAnswers.manOfficeNum);
    // console.log(manager)
    employees.push(manager)
    nextQuestion();
    
  });
};

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
  ]).then(answers => {
    
      if (answers.member === 'Engineer') {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // console.log(engineer)
        employees.push(engineer)
        nextQuestion();
        
      } else if (answers.member === 'Intern') {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        // console.log(intern)
        employees.push(intern)
        nextQuestion();
        // console.log(employees)
      } else if (answers.member === "I don't want to add any more team members") {
        // console.log(employees)
        writeHTML();
        // importCards(employees);
      }
  });
};

function manCard(manager) {
  return `
    <div class="card m-5 shadow" style="width: 25rem;">
      <div class="bg-primary text-white" >
        <h5 class="card-title m-2">${manager.personName}</h5>
        <h5 class="card-text m-2">Manager</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">id: ${manager.id}</li>
        <li class="list-group-item">email: ${manager.email}</li>
        <li class="list-group-item">office number: ${manager.officeNumber}</li>
      </ul>
    </div>`
};

function cards(member) {
  switch (member.getRole()) {
    case "Engineer":
      return `
        <div class="card m-5 shadow" style="width: 25rem;">
          <div class="bg-primary text-white" >
            <h5 class="card-title m-2">${member.personName}</h5>
            <h5 class="card-text m-2">Engineer</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">id: ${member.id}</li>
            <li class="list-group-item">email: ${member.email}</li>
            <li class="list-group-item">github: ${member.github}</li>
          </ul>
        </div>`;

    case "Intern" :
      return `
      <div class="card m-5 shadow" style="width: 25rem;">
        <div class="bg-primary text-white" >
          <h5 class="card-title m-2">${member.personName}</h5>
          <h5 class="card-text m-2">Intern</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">id: ${member.id}</li>
          <li class="list-group-item">email: ${member.email}</li>
          <li class="list-group-item">github: ${member.school}</li>
        </ul>
      </div>`;
  }  
}

function makeHTML () {
return`
<!DOCTYPE html>
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
    ${manCard(employees[0])}

    ${createCards()}
  </div>

</body>
</html>`;
}

function createCards() {
  let allCards = cards(employees[1]);
  for (let i = 2; i < employees.length; i++) {
    allCards = allCards + cards(employees[i]);
  }
  // console.log(allCards)
  return allCards;
}

const writeHTML = function() {
  const newHTML = makeHTML(cards)
  fs.writeFile('./dist/index.html', newHTML, (error) => 
  error ? console.log(error) : console.log('INDEX HTML MADE')
  );
};

teamManager();