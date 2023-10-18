const fs = require('fs');
const path = require('path');

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
};
