const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("properties", () => {
    it("should return an object containing personName, id, email, github", () => {
      const obj = new Engineer('Bob', 10, 'Bob@bob.com', 'bobob');

      expect(obj.personName).toEqual('Bob');
      expect(obj.id).toEqual(10);
      expect(obj.email).toEqual('Bob@bob.com');
      expect(obj.github).toEqual('bobob');
    });
  });

  describe("getters", () => {
    it("should return an object containing github, role", () => {
      const met = new Engineer('Jim', 15, 'hp@gmail.com', 'jimbob', 'Engineer');

      expect(met.getName()).toEqual('Jim');
      expect(met.getId()).toEqual(15);
      expect(met.email).toEqual('hp@gmail.com');
      expect(met.github).toEqual('jimbob');
      expect(met.getRole()).toEqual('Engineer');
    });
  });
})