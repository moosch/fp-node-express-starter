/**
 * TODO: Convert this to a Future/Maybe style file access
 */

/**
 * This fils is not that important.
 * It's a fake of what you would do depending on your database type and ORM.
 * Here we are simply accessing a local JSON file to store data.
 */

import fs from 'fs';
import path from 'path';
import uuid from 'uuid';

const USERS_FILE_PATH = path.resolve(__dirname, 'user.json');

function _readUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile(USERS_FILE_PATH, (err, data) => {
      if (err || !data) {
        reject(err);
      }

      resolve(JSON.parse(data.toString()));
    });
  });
}

function _saveUsers(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve();
    });
  });
}

function createUser(props) {
  return {
    id: uuid.v4(),
    ...(props.firstName && { firstName: props.firstName }),
    ...(props.lastName && { lastName: props.lastName }),
    ...(props.age && { age: props.age }),
  }
}

const UserModel = {
  find: async (id) => {
    const users = await _readUsers();
    return users.find((u) => u.id === id);
  },

  findAll: async (limit, offset) => {
    const users = await _readUsers();

    return users.slice(offset || 0, limit || 20);
  },

  create: async (props) => {
    const user = createUser(props);
    let users = await _readUsers();
    users = [...users, user];

    await _saveUsers(users);
    return user;
  },

  update: async (id, props) => {
    let users = await _readUsers();
    let user = users.find((u) => u.id === id);

    users = users.filter((u) => u.id !== id);

    user = { ...user, ...props };
    users = [...users, user];

    await _saveUsers(users);
    return user;
  },

  delete: async (id) => {
    let users = await _readUsers();
    users = users.filter((u) => u.id !== id);

    return _saveUsers(users);
  },
}

export default UserModel;
