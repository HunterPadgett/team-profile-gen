const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("properties", () => {
    it("should return an object containing personName, id, email, officeNumber", () => {
      const obj = new Manager('Bob', 10, 'Bob@bob.com', 1);

      expect(obj.personName).toEqual('Bob');
      expect(obj.id).toEqual(10);
      expect(obj.email).toEqual('Bob@bob.com');
      expect(obj.officeNumber).toEqual(1);
    });
  });

  describe("getters", () => {
    it("should return an object containing officeNumber, role", () => {
      const met = new Manager('Jim', 15, 'hp@gmail.com', 2, 'Manager');

      expect(met.getName()).toEqual('Jim');
      expect(met.getId()).toEqual(15);
      expect(met.email).toEqual('hp@gmail.com');
      expect(met.getOfficeNumber()).toEqual(2);
      expect(met.getRole()).toEqual('Manager');
    });
  });
})