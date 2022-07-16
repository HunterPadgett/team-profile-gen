class Employee {
  constructor(personName, id, email) {
    this.personName = personName
    this.id = id
    this.email = email
  } 
  
  getName() {
    return this.personName;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    this.email;
  }

  getRole() {
    return "Employee";
  }
}

module.exports = Employee;