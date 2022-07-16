const Employee = require('./Employee')

class Manager extends Employee {
  constructor(personName, id, email, officeNumber) {
    super(personName, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;