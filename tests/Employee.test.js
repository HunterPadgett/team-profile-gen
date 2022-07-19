const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("properties", () => {
    it("should return an object containing personName, id, email", () => {
      const obj = new Employee('Bob', 10, 'Bob@bob.com');

      expect(obj.personName).toEqual('Bob');
      expect(obj.id).toEqual(10);
      expect(obj.email).toEqual('Bob@bob.com');
    });
  });

  describe("getters", () => {
    it("should return an object containing personName, id, email, role", () => {
      const met = new Employee('Jim', 15, 'hp@gmail.com', 'Employee');

      expect(met.getName()).toEqual('Jim');
      expect(met.getId()).toEqual(15);
      expect(met.getEmail()).toEqual('hp@gmail.com');
      expect(met.getRole()).toEqual('Employee');
    });
  });
})
