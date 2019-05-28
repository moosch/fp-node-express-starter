import Task from 'data.task';

import errors from './user.errors';

const UserModel = {
  // findAll :: {Int, Int} -> Task
  findAll: ({ limit, offset }) => new Task((reject, resolve) => {
    const users = [{
      "id":"1",
      "firstName":"John",
      "lastName":"Pick",
      "age":27,
    }];

    if (users) {
      resolve(users.slice(offset || 0, limit || 20))
    } else {
      reject(errors.InvalidRequestError);
    }
  }),
}

export default UserModel;
