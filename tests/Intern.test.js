const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("properties", () => {
    it("should return an object containing personName, id, email, school", () => {
      const obj = new Intern('Bob', 10, 'Bob@bob.com', 'UGA');

      expect(obj.personName).toEqual('Bob');
      expect(obj.id).toEqual(10);
      expect(obj.email).toEqual('Bob@bob.com');
      expect(obj.school).toEqual('UGA');
    });
  });

  describe("getters", () => {
    it("should return an object containing personName, id, email, school, role", () => {
      const met = new Intern('Jim', 15, 'hp@gmail.com', 'UNG', 'Intern');

      expect(met.getName()).toEqual('Jim');
      expect(met.getId()).toEqual(15);
      expect(met.email).toEqual('hp@gmail.com');
      expect(met.school).toEqual('UNG');
      expect(met.getRole()).toEqual('Intern');
    });
  });
})