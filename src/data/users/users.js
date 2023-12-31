const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getUsers: function () {
    const usersPath = path.join(__dirname, './users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    return users;
  },
  saveUsers: function (users) {
    const usersDBPath = path.join(__dirname, './users.json');
    fs.writeFileSync(usersDBPath, JSON.stringify(users, null, 2));
  },
  findAll: function () {
    return this.getUsers();
  },
  findById: function (id) {
    const user = this.findAll().find((user) => user.id == id);
    return user;
  },
  findByField: function (field, text) {
    const users = this.findAll();
    const userByField = users.find((user) => user[field] == text);
    return userByField;
  },
  create: function (user) {
    console.log(`Creating user ${user.username}`);
    const users = this.getUsers();
    const newUser = {
      id: uuidv4(),
      ...user,
    };
    users.push(newUser);
    this.saveUsers(users);
  },
};
