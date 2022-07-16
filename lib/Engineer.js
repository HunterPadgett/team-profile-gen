const Employee = require('./Employee')

class Engineer extends Employee {
  constructor(personName, id, email, github) {
    super(personName, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;