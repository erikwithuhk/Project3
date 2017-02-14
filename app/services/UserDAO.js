const db = require('../db/db');
const sql = require('../db/sqlProvider').users;
const User = require('../models/User');

class UserDAO {
  static all() {
    return db.map(sql.all, [], row => new User(row));
  }
  static findBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.one(sql.find, [key, value])
             .then(row => new User(row))
             .catch(err => console.error(err));
  }
  static create({ email, password, username }) {
    return db.one(sql.create, [email, password, username])
             .then(row => new User(row))
             .catch(err => console.error(err));
  }
  static save({ id, email, username, firstName, lastName, bio, password }) {
    return db.one(sql.save, [id, email, username, firstName, lastName, bio, password]);
  }
  static delete(id) {
    return db.none(sql.delete, [id]);
  }
}

module.exports = UserDAO;
